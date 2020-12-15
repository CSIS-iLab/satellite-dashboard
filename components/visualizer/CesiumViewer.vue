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

let Cesium, viewer, pathMaterial

export default {
  props: {
    satellites: {
      type: Object,
      default: () => {}
    },
    activeSatellites: {
      type: Array,
      default: () => []
    },
    selectedDate: {
      type: Date,
      required: true
    },
    selectedTimescale: {
      type: Number,
      required: true
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
      SimInt: 24 * 60 * 60, // 12 hours
      SimStart: null,
      SimStop: null,
      satellitesHaveLoaded: false
    }
  },
  watch: {
    activeSatellites: 'processNewData'
  },
  mounted() {
    this.$refs.vcViewer.createPromise.then(({ Cesium, viewer }) => {
      console.log('viewer is loaded.')
    })
  },
  methods: {
    ready(cesiumInstance) {
      console.log('is ready')
      // Set up the Cesium Viewer
      Cesium = cesiumInstance.Cesium
      viewer = cesiumInstance.viewer
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

      viewer.clock.clockRange = Cesium.ClockRange.CLAMP

      viewer.selectedEntityChanged.addEventListener((entity) => {
        if (!entity) {
          return
        }
        entity.path.show = true
      })
      pathMaterial = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.BLUE)
      /* if this.satellitesHaveLoaded is true then API beat Cesium to it
      and we didn't process data when watch handler fired */
      if (this.satellitesHaveLoaded) {
        this.processNewData()
      }
    },
    processNewData() {
      // in case cesium hasn't loaded yet
      this.satellitesHaveLoaded = true
      if (!Cesium) {
        return
      }
      console.log('processing new data')
      const jNow = Cesium.JulianDate.fromDate(this.selectedDate)
      this.SimInt = this.selectedTimescale
      this.SimStart = jNow
      this.SimStop = Cesium.JulianDate.addSeconds(
        jNow,
        this.SimInt,
        new Cesium.JulianDate()
      )
      viewer.clock.startTime = this.SimStart
      viewer.clock.stopTime = this.SimStop
      viewer.clock.shouldAnimate = true
      viewer.timeline.zoomTo(this.SimStart, this.SimStop)
      viewer.clock.currentTime = this.SimStart
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

      viewer.entities.removeAll()

      // For each object, calculate its position & orbit
      // Calculations pulled from: https://github.com/ut-astria/AstriaGraph/blob/master/main.js & https://github.com/ut-astria/AstriaGraph/blob/master/celemech.js
      this.activeSatellites.forEach((sat, i) => {
        const { catalog_id, orbits, source1 } = this.satellites[sat]
        const name = source1.Name

        // Make a copy of the orbital parameters so we can modify it with our calculations.

        // TODO: Change this so it looks at the correct orbit, not just the first one.
        const orbit = this.compileOrbits(orbits, CRFtoTRF, epjd)

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
            material: pathMaterial,
            width: 6,
            show: i === 0
          }
        })
      })
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
    calcOrbit(CRFtoTRF, elems, positionSamples) {
      let sampleCount = 0
      let car = new Cesium.Cartographic()
      let Y = new Cesium.Cartesian3()
      let sta

      let step = 5 * 60 * 1000 // 5 minutes - starting point resolution for Cesium interpolated values to be derived from
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
        const position = Cesium.Cartesian3.fromRadians(
          car.longitude,
          car.latitude,
          car.height
        )
        positionSamples.addSample(timePoint, position)
        ++sampleCount
        if (sampleCount === 2) {
          // once we have two points, we have the velocity
          const orbitalRadius = Cesium.Cartesian3.distance(
            new Cesium.Cartesian3(0, 0, 0),
            position
          )
          const orbitalCircumf = TwoPi * orbitalRadius
          const prevPosition = positionSamples.getValue(
            new Cesium.JulianDate.fromDate(new Date(fromTime))
          )
          const distance = Cesium.Cartesian3.distance(prevPosition, position)
          const velocity = distance / step
          step = orbitalCircumf / 360 / velocity
        }
      }
      return positionSamples
    },
    compileOrbits(orbits, CRFtoTRF, epjd) {
      const positionSamples = new Cesium.SampledPositionProperty()
      positionSamples.setInterpolationOptions({
        interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
        interpolationDegree: 1
      })

      const duration = this.SimInt
      const orbitalFragmentSize = duration / orbits.length

      orbits.forEach((orbit, i) => {
        const elems = Object.assign({}, orbit.elements)
        const fragmentEnd = Cesium.JulianDate.addSeconds(
          this.SimStart,
          orbitalFragmentSize * (i + 1),
          new Cesium.JulianDate()
        )

        // Cesium.JulianDate.fromIso8601('2020-06-13T22:00:02.000000Z', epjd)
        Cesium.JulianDate.fromIso8601(elems.Epoch, epjd)
        let t = Cesium.JulianDate.daysDifference(fragmentEnd, epjd)
        elems.mmo = Math.sqrt(EGM96_mu / (elems.SMA * elems.SMA * elems.SMA))
        elems.MeanAnom = (elems.MeanAnom + elems.mmo * t * 86400) % TwoPi

        // Calculate Orbit
        this.calcOrbit(CRFtoTRF, elems, positionSamples)
      })

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
