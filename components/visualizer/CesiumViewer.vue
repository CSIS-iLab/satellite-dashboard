<template>
  <div ref="viewerContainer" class="viewer">
    <button @click="zoomIn">Zoom in</button>
    <button @click="zoomReset">Reset</button>
    <button @click="zoomOut">Zoom Out</button>
    <vc-viewer
      ref="vcViewer"
      :animation="animation"
      :base-layer-picker="baseLayerPicker"
      :timeline="timeline"
      :fullscreen-button="fullscreenButton"
      :info-box="infoBox"
      :camera="camera"
      @ready="ready"
    >
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
import { mapMutations } from 'vuex'
import cesiumServiceProvider from '~/services/cesium-service'
const cesiumService = cesiumServiceProvider()
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
      infoBox: false,
      alpha: 1,
      brightness: 1,
      contrast: 1,
      SimInt: 24 * 60 * 60, // 24 hours
      SimStart: null,
      SimStop: null,
      satellitesHaveLoaded: false,
      defaultZoomAmount: 15000000,
      defaultPosition: {
        lng: -80,
        lat: 5,
        height: 100000000
      },
      camera: {
        position: {
          lng: 104.06,
          lat: 5,
          height: 100000000
        }
      }
    }
  },
  watch: {
    activeSatellites: 'processNewData'
  },
  beforeDestroy() {
    Cesium = null
    viewer = null
  },
  mounted() {
    this.$refs.vcViewer.createPromise.then((cesiumInstance) => {
      cesiumService.registerInstance(cesiumInstance)
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

      viewer.camera.defaultZoomAmount = this.defaultZoomAmount

      viewer.clock.clockRange = Cesium.ClockRange.CLAMP

      viewer.selectedEntityChanged.addEventListener((entity) => {
        if (!entity) {
          return
        }
        entity.path.show = true
        this.showSatelliteDetails(entity.id)
      })

      /* This event listener adjusts the camera position every frame
      so that it does not track the Earth's rotation, and we see the
      Earth rotating from a fixed position */
      viewer.scene.postUpdate.addEventListener((scene, time) => {
        if (scene.mode !== Cesium.SceneMode.SCENE3D) {
          return
        }
        const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
        if (Cesium.defined(icrfToFixed)) {
          var offset = Cesium.Cartesian3.clone(viewer.camera.position)
          var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
          viewer.camera.lookAtTransform(transform, offset)
        }
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
      cesiumService.getTimeline().then((timeline) => {
        timeline.zoomTo(this.SimStart, this.SimStop)
      })
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
      let satCount = 0
      viewer.entities.removeAll()

      // For each object, calculate its position & orbit
      // Calculations pulled from: https://github.com/ut-astria/AstriaGraph/blob/master/main.js & https://github.com/ut-astria/AstriaGraph/blob/master/celemech.js
      this.activeSatellites.forEach((sat, i) => {
        const { catalog_id, orbits, source1 } = this.satellites[sat]
        if (!orbits) {
          return
        }
        satCount++
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
              stop: Cesium.JulianDate.addSeconds(
                this.SimStop,
                this.SimInt * 0.01, // add 1% to ensure satellites don't disappear when Cesium goes slightly beyond
                new Cesium.JulianDate()
              )
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
            resolution: 2000,
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
    calcOrbit(CRFtoTRF, elems, positionSamples, startTime, endTime, step) {
      let car = new Cesium.Cartographic()
      let Y = new Cesium.Cartesian3()
      let sta

      const fromTime = Cesium.JulianDate.toDate(startTime).valueOf()
      const toTime = Cesium.JulianDate.toDate(endTime).valueOf()
      for (let t = fromTime; t <= toTime; t += step) {
        const u = Object.assign({}, elems)
        const timePoint = new Cesium.JulianDate.fromDate(new Date(t))
        const secondsAdvanced = Cesium.JulianDate.secondsDifference(
          timePoint,
          startTime
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
          car.height,
          viewer.scene.mapProjection.ellipsoid
        )
        positionSamples.addSample(timePoint, position)
      }
      return positionSamples
    },
    compileOrbits(orbits, CRFtoTRF, epjd) {
      const positionSamples = new Cesium.SampledPositionProperty(
        Cesium.ReferenceFrame.INERTIAL
      )
      positionSamples.setInterpolationOptions({
        interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
        interpolationDegree: 1
      })

      const duration = this.SimInt
      const numDays = duration / 86400

      /* The below ensures that we have the number of orbital elements we iterate
      over matches the number we would expect to have given the number of days. So
      If we request 7 days, and only 3 orbital elements are available, then we fill
      the gaps with the last available orbital element. This is so the position
      calculations are evenly spaced */
      const paddedOrbits = []
      let lastMatch = 0
      for (let day = 0; day < numDays; day++) {
        const targetDate = Cesium.JulianDate.toDate(
          Cesium.JulianDate.addDays(this.SimStart, day, new Cesium.JulianDate())
        ).setHours(0, 0, 0, 0)
        const orbit = orbits[lastMatch]
        const epochDate = new Date(orbit.elements.Epoch).setHours(0, 0, 0, 0)
        if (epochDate.valueOf() === targetDate.valueOf() && orbits[day + 1]) {
          lastMatch++
        }
        paddedOrbits.push(orbit)
      }

      const orbitalFragmentSize = duration / paddedOrbits.length
      let step = (duration / 360) * 1000

      paddedOrbits.forEach((orbit, i, a) => {
        const elems = Object.assign({}, orbit.elements)
        const fragmentStart = Cesium.JulianDate.addSeconds(
          this.SimStart,
          orbitalFragmentSize * i,
          new Cesium.JulianDate()
        )
        const padFactor = i === a.length - 1 ? 1.01 : 1
        const fragmentEnd = Cesium.JulianDate.addSeconds(
          this.SimStart,
          orbitalFragmentSize * (i + 1) * padFactor,
          new Cesium.JulianDate()
        )

        // Cesium.JulianDate.fromIso8601('2020-06-13T22:00:02.000000Z', epjd)
        Cesium.JulianDate.fromIso8601(elems.Epoch, epjd)
        let t = Cesium.JulianDate.daysDifference(fragmentEnd, epjd)
        elems.mmo = Math.sqrt(EGM96_mu / (elems.SMA * elems.SMA * elems.SMA))
        elems.MeanAnom = (elems.MeanAnom + elems.mmo * t * 86400) % TwoPi

        // Calculate Orbit
        this.calcOrbit(
          CRFtoTRF,
          elems,
          positionSamples,
          fragmentStart,
          fragmentEnd,
          step
        )
      })

      return positionSamples
    },
    showSatelliteDetails(catalog_id) {
      console.log('show details')
      this.updateDetailedSatellite(catalog_id)
    },
    zoomIn() {
      console.log('zoom in!')
      console.log(viewer)
      viewer.camera.zoomIn()
    },
    zoomOut() {
      console.log('zoom out!')
      console.log(viewer)
      viewer.camera.zoomOut()
    },
    zoomReset() {
      const camera = viewer.camera

      console.log(camera.position)
      console.log(camera.heading)
      console.log(camera.pitch)
      console.log(camera.roll)

      const resetView = this.defaultPosition
      console.log(resetView)
      if (resetView && resetView.lng) {
        console.log('reset to here')
        camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            resetView.lng,
            resetView.lat,
            resetView.height
          ),
          orientation: {
            heading: Cesium.Math.toRadians(resetView.heading || 360),
            // pitch: Cesium.Math.toRadians(45),
            // pitch: -1.5702983362514793,
            pitch: Cesium.Math.toRadians(resetView.pitch || -90),
            roll: Cesium.Math.toRadians(resetView.roll || 0)
          }
        })
      }

      if (Cesium.defined(viewer.trackedEntity)) {
        // when tracking do not reset to default view but to default view of tracked entity
        const trackedEntity = viewer.trackedEntity
        viewer.trackedEntity = undefined
        viewer.trackedEntity = trackedEntity
      }
    },
    ...mapMutations({
      updateDetailedSatellite: 'satellites/updateDetailedSatellite'
    })
  }
}
</script>

<style lang="scss">
.viewer {
  width: 100%;
  height: 66vh;
}
</style>
