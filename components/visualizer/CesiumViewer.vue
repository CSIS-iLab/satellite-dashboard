<template>
  <div ref="viewerContainer" class="viewer">
    Test Viewer Component
    <vc-viewer
      ref="vcViewer"
      :animation="animation"
      :base-layer-picker="baseLayerPicker"
      :timeline="timeline"
      :fullscreen-button="fullscreenButton"
      :info-box="infoBox"
      @ready="ready"
    >
      <vc-navigation></vc-navigation>
      <!-- <vc-layer-imagery
        :alpha="alpha"
        :brightness="brightness"
        :contrast="contrast"
      >
        <vc-provider-imagery-ion :asset-id="3845"></vc-provider-imagery-ion>
      </vc-layer-imagery> -->
    </vc-viewer>
  </div>
</template>

<script>
// Set up constants needed for position calculations.
const J2000Epoch = 2451545.0
const JulYear = 365.25
const JulCent = JulYear * 100

const EGM96_mu = 3.986004415e14 // m^3/s^2
const EGM96_REarth = 6378136.3 // m

const TwoPi = 2 * Math.PI
const RadDeg = 180 / Math.PI
const DegRad = Math.PI / 180

export default {
  props: {
    satellites: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      animation: true,
      timeline: true,
      baseLayerPicker: false,
      fullscreenButton: false,
      infoBox: true,
      alpha: 1,
      brightness: 1,
      contrast: 1,
      SimInt: 12 * 60 * 60, // 12 hours
      SimStart: null,
      SimStop: null
    }
  },
  mounted() {
    this.$refs.vcViewer.createPromise.then(({ Cesium, viewer }) => {
      console.log('viewer is loaded.')
    })
  },
  methods: {
    ready(cesiumInstance) {
      // Set up the Cesium Viewer
      const { Cesium, viewer } = cesiumInstance
      const scene = viewer.scene
      const globe = scene.globe

      globe.enableLighting = true
      globe.lightingFadeOutDistance = 9000000
      globe.lightingFadeInDistance = 30000000
      globe.nightFadeOutDistance = 1000000
      globe.nightFadeInDistance = 8000000

      scene.skyBox = new Cesium.SkyBox({
        show: false
      })

      this.SimStart = Cesium.JulianDate.now()
      this.SimStop = Cesium.JulianDate.addSeconds(
        this.SimStart,
        this.SimInt,
        new Cesium.JulianDate()
      )

      viewer.clock.startTime = this.SimStart
      viewer.clock.stopTime = this.SimStop
      viewer.clock.shouldAnimate = true
      viewer.clock.clockRange = Cesium.ClockRange.CLAMP
      viewer.timeline.zoomTo(this.SimStart, this.SimStop)

      viewer.selectedEntityChanged.addEventListener((entity) => {
        if (!entity) {
          return
        }
        entity.path.show = true
      })

      // Set up the current time and then load in the satellite objects.
      Cesium.Transforms.preloadIcrfFixed(
        new Cesium.TimeInterval({
          start: new Cesium.JulianDate(J2000Epoch - JulCent),
          stop: new Cesium.JulianDate(J2000Epoch + JulCent)
        })
      ).then(() => {
        this.displayObjects(Cesium, viewer)
      })
    },
    displayObjects(Cesium, viewer) {
      let epjd = new Cesium.JulianDate()
      let CRFtoTRF = Cesium.Transforms.computeIcrfToFixedMatrix(this.SimStart)

      // For each object, calculate its position & orbit
      // Calculations pulled from: https://github.com/ut-astria/AstriaGraph/blob/master/main.js & https://github.com/ut-astria/AstriaGraph/blob/master/celemech.js

      this.satellites.forEach((sat, i) => {
        const { catalog_id, orbital, source1 } = sat
        const name = source1.Name

        // Make a copy of the orbital parameters so we can modify it with our calculations.
        let elems = Object.assign({}, orbital)

        // Cesium.JulianDate.fromIso8601('2020-06-13T22:00:02.000000Z', epjd)
        Cesium.JulianDate.fromIso8601(elems.Epoch, epjd)
        let t = Cesium.JulianDate.daysDifference(this.SimStop, epjd)
        elems.mmo = Math.sqrt(EGM96_mu / (elems.SMA * elems.SMA * elems.SMA))
        elems.MeanAnom = (elems.MeanAnom + elems.mmo * t * 86400) % TwoPi

        // Calculate Orbit
        let orbit = this.calcOrbit(Cesium, viewer, CRFtoTRF, elems)

        viewer.entities.add({
          id: catalog_id,
          name: `${catalog_id}: ${name}`,
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: this.SimStart,
              stop: this.SimStop
            })
          ]),
          position: orbit,
          point: {
            pixelSize: 7,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1
          },
          path: {
            resolution: 30,
            material: new Cesium.PolylineArrowMaterialProperty(
              Cesium.Color.BLUE
            ),
            width: 6,
            show: i === 0
          }
        })
      })
    },
    // Reference: https://github.com/ut-astria/AstriaGraph/blob/master/main.js#L228-L240
    // this is likely redundant now
    updatePosition(Cesium, CsView, CRFtoTRF, elems) {
      // return function UpdateHelper() {
      var t = Cesium.JulianDate.secondsDifference(
        CsView.clock.currentTime,
        this.SimStart
      )
      var u = Object.assign({}, elems)
      u.MeanAnom = (u.MeanAnom + u.mmo * t) % TwoPi
      var eff = new Cesium.Cartesian3()
      var eci = this.eltocart(Cesium, u, true, 1e-3)
      Cesium.Matrix3.multiplyByVector(CRFtoTRF, eci, eff)
      return eff
      // }
    },
    // Reference: https://github.com/ut-astria/AstriaGraph/blob/master/celemech.js#L44
    eltocart(Cesium, ele, posonly = false, tol = 1e-6, MAXITER = 20) {
      var ecan = this.ecceanom(ele.MeanAnom, ele.Ecc, tol, MAXITER)
      var tran =
        2 *
        Math.atan2(
          Math.sqrt((1 + ele.Ecc) / (1 - ele.Ecc)) * Math.sin(ecan / 2),
          Math.cos(ecan / 2)
        )

      var p = ele.SMA * (1 - ele.Ecc * ele.Ecc)
      var r = p / (1 + ele.Ecc * Math.cos(tran))
      var h = Math.sqrt(EGM96_mu * p)

      var ci = Math.cos(ele.Inc)
      var si = Math.sin(ele.Inc)
      var cr = Math.cos(ele.RAAN)
      var sr = Math.sin(ele.RAAN)
      var cw = Math.cos(ele.ArgP + tran)
      var sw = Math.sin(ele.ArgP + tran)

      var pos = new Cesium.Cartesian3(
        cr * cw - sr * sw * ci,
        sr * cw + cr * sw * ci,
        si * sw
      )
      var pos2 = new Cesium.Cartesian3()
      Cesium.Cartesian3.multiplyByScalar(pos, r, pos2)
      if (posonly) return pos2

      var vel = new Cesium.Cartesian3()
      var vel1 = new Cesium.Cartesian3()
      var vel2 = new Cesium.Cartesian3()
      Cesium.Cartesian3.subtract(
        Cesium.Cartesian3.multiplyByScalar(
          pos2,
          (h * ele.Ecc * Math.sin(tran)) / (r * p),
          vel1
        ),
        Cesium.Cartesian3.multiplyByScalar(
          new Cesium.Cartesian3(
            cr * sw + sr * cw * ci,
            sr * sw - cr * cw * ci,
            -si * cw
          ),
          h / r,
          vel2
        ),
        vel
      )

      return { pos: pos2, vel: vel }
    },
    // Reference: https://github.com/ut-astria/AstriaGraph/blob/master/celemech.js#L30
    ecceanom(mean, ecc, tol, MAXITER) {
      var prev = mean
      for (let i = 1; i <= MAXITER; i++) {
        var curr =
          prev -
          (prev - ecc * Math.sin(prev) - mean) / (1 - ecc * Math.cos(prev))
        if (Math.abs(curr - prev) <= tol) return curr % TwoPi
        prev = curr
      }

      return NaN
    },
    // Reference: https://github.com/ut-astria/AstriaGraph/blob/master/main.js#L242
    calcOrbit(Cesium, viewer, CRFtoTRF, elems) {
      let car = new Cesium.Cartographic()
      let Y = new Cesium.Cartesian3()
      let sta
      let positionSamples = new Cesium.SampledPositionProperty()
      const step = 5 * 60 * 1000 // 5 minutes - resolution for Cesium interpolated values to be derived from
      const fromTime = Cesium.JulianDate.toDate(this.SimStart).valueOf()
      const toTime = Cesium.JulianDate.toDate(this.SimStop).valueOf() + step // calc one extra step so timeline end doesn't cut off
      for (let t = fromTime; t <= toTime; t += step) {
        const u = Object.assign({}, elems)
        const timePoint = new Cesium.JulianDate.fromDate(new Date(t))
        const secondsAdvanced = Cesium.JulianDate.secondsDifference(
          timePoint,
          this.SimStart
        )
        u.MeanAnom = (u.MeanAnom + u.mmo * secondsAdvanced) % TwoPi
        if (u.MeanAnom === 0) {
          sta = this.eltocart(Cesium, u, false, 1e-6, 100)
          Cesium.Matrix3.multiplyByVector(CRFtoTRF, sta.pos, Y)
        } else {
          // do other stuff
          sta = this.eltocart(Cesium, u, true, 1e-6, 100)
          Cesium.Matrix3.multiplyByVector(CRFtoTRF, sta, Y)
        }

        viewer.scene.mapProjection.ellipsoid.cartesianToCartographic(Y, car)
        if (
          Number.isNaN(car.longitude) ||
          Number.isNaN(car.latitude) ||
          Number.isNaN(car.height)
        ) {
          continue
        }
        positionSamples.addSample(
          timePoint,
          Cesium.Cartesian3.fromRadians(car.longitude, car.latitude, car.height)
        )
      }
      return positionSamples
    }
  }
}
</script>

<style lang="scss">
.viewer {
  width: 100%;
  height: 800px;
}
</style>
