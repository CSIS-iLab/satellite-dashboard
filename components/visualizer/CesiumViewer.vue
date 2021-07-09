<template>
  <div ref="viewerContainer" class="viewer">
    <ul class="viewer-controls" role="list">
      <Button
        class="btn--controls btn--zoom"
        aria-label="Zoom Out"
        :on-click="zoomOut"
      >
        <Icon id="minus" name="minus" focusable="false" />
      </Button>
      <Button
        class="btn--controls btn--zoom"
        aria-label="Reset Zoom"
        :on-click="zoomReset"
      >
        <Icon id="world" name="world" focusable="false" />
      </Button>
      <Button
        class="btn--controls btn--zoom"
        aria-label="Zoom In"
        :on-click="zoomIn"
      >
        <Icon id="plus" name="plus" focusable="false" />
      </Button>
      <Button
        class="btn--controls btn--sun"
        aria-label="Sunlight"
        :aria-pressed="showSunlight"
        :on-click="toggleSunlight"
      >
        <Icon
          v-show="showSunlight"
          id="sun-on"
          name="sun-on"
          focusable="false"
        />
        <Icon
          v-show="!showSunlight"
          id="sun-off"
          name="sun-off"
          focusable="false"
        />
      </Button>
      <HelpPanel />
    </ul>
    <!-- <client-only> -->
    <vc-viewer
      ref="vcViewer"
      :animation="animation"
      :base-layer-picker="baseLayerPicker"
      :timeline="timeline"
      :fullscreen-button="fullscreenButton"
      :info-box="infoBox"
      :camera="camera"
      :selection-indicator="selectionIndicator"
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
    <!-- </client-only> -->
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'
import HelpPanel from '~/components/visualizer/HelpPanel'
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
let entityColors = {}

export default {
  components: {
    Button,
    Icon,
    HelpPanel
  },
  props: {
    satelliteOrbits: {
      type: Object,
      default: () => {}
    },
    visibleSatellites: {
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
      showSunlight: true,
      satellitesHaveLoaded: false,
      selectionIndicator: false,
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
  computed: {
    numSatelliteOrbits() {
      return Object.keys(this.satelliteOrbits).length
    },
    ...mapState({
      satellites: (state) => state.satellites.satellites,
      statusTypes: (state) => state.satellites.statusTypes
    }),
    ...mapGetters({
      satelliteCatalogIds: 'satellites/satelliteCatalogIds',
      statusTypesKeys: 'satellites/statusTypesKeys'
    })
  },
  watch: {
    satelliteOrbits: 'processNewData',
    visibleSatellites: 'toggleObjectVisibility',
    '$route.query.time': 'handleTimeQuery'
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
    handleTimeQuery() {
      if (!viewer || !Cesium) {
        return
      }
      if (this.$route.query.time) {
        let seconds = parseInt(this.$route.query.time)
        if (isNaN(seconds)) {
          seconds = 0
        }
        viewer.clock.currentTime = Cesium.JulianDate.addSeconds(
          this.SimStart,
          seconds,
          new Cesium.JulianDate()
        )
      } else {
        viewer.clock.currentTime = this.SimStart
      }
    },
    ready(cesiumInstance) {
      console.log('is ready')
      // Set up the Cesium Viewer
      Cesium = cesiumInstance.Cesium
      viewer = cesiumInstance.viewer
      const scene = viewer.scene
      const globe = scene.globe

      globe.enableLighting = this.showSunlight
      scene.sun = new Cesium.Sun()
      scene.sun.show = this.showSunlight

      globe.lightingFadeOutDistance = 9000000
      globe.lightingFadeInDistance = 30000000
      globe.nightFadeOutDistance = 1000000
      globe.nightFadeInDistance = 8000000

      viewer.camera.defaultZoomAmount = this.defaultZoomAmount

      viewer.clock.clockRange = Cesium.ClockRange.CLAMP

      let scratch3dPosition = new Cesium.Cartesian3()
      let scratch2dPosition = new Cesium.Cartesian2()
      let isEntityVisible = true

      // Create a sample HTML element in the document.
      let labelContainer = document.createElement('div')
      labelContainer.classList.add('cesium__entity-label-container')
      viewer.container.appendChild(labelContainer)

      let entityLabel = document.createElement('div')
      entityLabel.classList.add('cesium__entity-label')

      let highlightedEntities = new Set()

      let lastSelectedEntity = null

      // Every animation frame, update the HTML element position from the entity.
      viewer.clock.onTick.addEventListener(function(clock) {
        let position3d
        let position2d

        highlightedEntities.forEach((entity) => {
          let label
          // Not all entities have a position, need to check.
          if (entity && entity.position) {
            position3d = entity.position.getValue(
              clock.currentTime,
              scratch3dPosition
            )
            label = document.getElementById(`entity-${entity.id}`)
          }

          if (!label) {
            return
          }

          // Moving entities don't have a position for every possible time, need to check.
          if (position3d) {
            position2d = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
              viewer.scene,
              position3d,
              scratch2dPosition
            )
          }

          // Having a position doesn't guarantee it's on screen, need to check.
          if (position2d) {
            // Set the HTML position to match the entity's position.
            label.style.transform = `translate(${position2d.x}px, ${position2d.y}px)`

            // Reveal HTML when entity comes on screen
            if (!isEntityVisible) {
              isEntityVisible = true
              label.style.display = 'block'
            }
          } else if (isEntityVisible) {
            // Hide HTML when entity goes off screen or loses its position.
            isEntityVisible = false
            label.style.display = 'none'
          }
        })
      })

      // Toggle an entity's path & label if we click on it.
      const selectEntity = (event) => {
        const picked = viewer.scene.pick(event.position)
        if (Cesium.defined(picked)) {
          const entity = Cesium.defaultValue(picked.id, picked.primitive.id)
          if (entity instanceof Cesium.Entity) {
            if (highlightedEntities.has(entity)) {
              lastSelectedEntity = entity
              if (!viewer.selectedEntity !== entity) {
                viewer.selectedEntity =
                  viewer.selectedEntity === null ? false : null
              }
            } else {
              // Update highlightedEntries & add label when the selectedEntity changes to make behavior consistent across viewer & buttons on panels.
              //highlightedEntities.add(entity)
              lastSelectedEntity = null
              viewer.selectedEntity = entity
            }
          }
        } else if (highlightedEntities.size === 0) {
          this.zoomReset()
        }
      }

      viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(
        selectEntity,
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )

      const handleHighlights = (entity) => {
        if (highlightedEntities.has(entity)) {
          highlightedEntities.delete(entity)
          entity.path.show = false
          document.getElementById(`entity-${entity.id}`).remove()
        } else {
          // Update highlightedEntries & add label when the selectedEntity changes to make behavior consistent across viewer & buttons on panels.
          highlightedEntities.add(entity)
          entity.path.show = true

          let label = entityLabel.cloneNode()
          label.id = `entity-${entity.id}`
          label.innerHTML = entity.name
          labelContainer.appendChild(label)
        }
      }

      viewer.selectedEntityChanged.addEventListener((entity) => {
        if (!entity) {
          handleHighlights(lastSelectedEntity)
          if (highlightedEntities.size === 0) {
            this.zoomReset()
            viewer.trackedEntity = null
          } else {
            const highlightedEntitiesArray = [...highlightedEntities]
            const newSelection =
              highlightedEntitiesArray[highlightedEntitiesArray.length - 1]
            highlightedEntities.delete(newSelection)
            viewer.selectedEntity = newSelection
          }
          return
        }
        handleHighlights(entity)
        viewer.trackedEntity = entity
        const entityPosition = viewer.scene.mapProjection.ellipsoid.cartesianToCartographic(
          entity.position.getValue(viewer.clock.currentTime)
        )
        entityPosition.height = entityPosition.height + this.defaultZoomAmount

        const cameraPosition = viewer.scene.mapProjection.ellipsoid.cartographicToCartesian(
          entityPosition
        )
        viewer.camera.flyTo({
          destination: cameraPosition
        })
        this.showSatelliteDetails(entity.id)
        lastSelectedEntity = entity
      })

      /* This event listener adjusts the camera position every frame
      so that it does not track the Earth's rotation, and we see the
      Earth rotating from a fixed position */
      viewer.scene.postUpdate.addEventListener((scene, time) => {
        if (viewer.trackedEntity || scene.mode !== Cesium.SceneMode.SCENE3D) {
          return
        }
        const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
        if (Cesium.defined(icrfToFixed)) {
          let offset = Cesium.Cartesian3.clone(viewer.camera.position)
          let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
          viewer.camera.lookAtTransform(transform, offset)
        }
      })

      // Set colors for the types
      pathMaterial = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.BLUE)

      for (let i = 0; i < this.statusTypesKeys.length; i++) {
        const type = this.statusTypesKeys[i]
        const color = Cesium.Color.fromCssColorString(
          this.statusTypes[type].color
        )

        entityColors[type] = {
          point: color,
          path: new Cesium.PolylineArrowMaterialProperty(color)
        }
      }

      /* if this.satellitesHaveLoaded is true then API beat Cesium to it
      and we didn't process data when watch handler fired */
      if (this.satellitesHaveLoaded) {
        this.processNewData()
      }
    },
    processNewData() {
      // in case cesium hasn't loaded yet
      this.satellitesHaveLoaded = true
      if (!Cesium || !this.numSatelliteOrbits) {
        return
      }

      console.log('processing new data')
      const jNow = Cesium.JulianDate.fromDate(
        new Date(this.selectedDate.setHours(0, 0, 0))
      )
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
      this.handleTimeQuery()
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
      viewer.entities.removeAll()

      // For each object, calculate its position & orbit
      // Calculations pulled from: https://github.com/ut-astria/AstriaGraph/blob/master/main.js & https://github.com/ut-astria/AstriaGraph/blob/master/celemech.js

      this.visibleSatellites.forEach((sat, i) => {
        if (!this.satelliteOrbits[sat]) {
          return
        }

        const { catalog_id, orbits } = this.satelliteOrbits[sat]

        if (!orbits) {
          return
        }

        const orbit = this.compileOrbits(orbits, epjd)

        const { Name, Status } = this.satellites[catalog_id]

        viewer.entities.add({
          id: catalog_id,
          name: Name,
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: this.SimStart,
              stop: Cesium.JulianDate.addSeconds(
                this.SimStop,
                this.SimInt * 0.1, // add 10% to ensure satellites don't disappear when Cesium goes slightly beyond
                new Cesium.JulianDate()
              )
            })
          ]),
          position: orbit,
          point: {
            pixelSize: 6,
            color: entityColors[Status].point
          },
          path: {
            resolution: 400,
            material: entityColors[Status].path,
            width: 4,
            show: false
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
    calcOrbit(elems, positionSamples, startTime, endTime, step) {
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
          Y = sta.pos
        } else {
          // do other stuff
          sta = this.eltocart(Cesium, u, true, 1e-6, 100)
          Y = sta
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
    compileOrbits(orbits, epjd) {
      const positionSamples = new Cesium.SampledPositionProperty(
        Cesium.ReferenceFrame.INERTIAL
      )
      positionSamples.setInterpolationOptions({
        interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
        interpolationDegree: 2
      })

      const duration = this.SimInt

      const paddedOrbits = orbits
      const finalElement = orbits[paddedOrbits.length - 1]

      const orbitalFragmentSize = duration / orbits.length
      let step = (duration / 360) * 1000

      //tack on an extra one so visibility doesn't cut off
      orbits.push(finalElement)

      orbits.forEach((orbit, i, a) => {
        const elems = Object.assign({}, orbit.elements)
        const fragmentStart = Cesium.JulianDate.addSeconds(
          this.SimStart,
          orbitalFragmentSize * i,
          new Cesium.JulianDate()
        )
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
        this.calcOrbit(elems, positionSamples, fragmentStart, fragmentEnd, step)
      })

      return positionSamples
    },
    showSatelliteDetails(catalog_id) {
      this.updateDetailedSatellite(catalog_id)
    },
    zoomIn() {
      viewer.camera.zoomIn()
    },
    zoomOut() {
      viewer.camera.zoomOut()
    },
    zoomReset() {
      const camera = viewer.camera

      const resetView = this.defaultPosition
      if (resetView && resetView.lng) {
        camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            resetView.lng,
            resetView.lat,
            resetView.height
          ),
          orientation: {
            heading: Cesium.Math.toRadians(resetView.heading || 360),
            pitch: Cesium.Math.toRadians(resetView.pitch || -90),
            roll: Cesium.Math.toRadians(resetView.roll || 0)
          }
        })
      }

      /*if (Cesium.defined(viewer.trackedEntity)) {
        // when tracking do not reset to default view but to default view of tracked entity
        // const trackedEntity = viewer.trackedEntity
        //viewer.trackedEntity = undefined
        // viewer.trackedEntity = trackedEntity
      }*/
    },
    toggleObjectVisibility() {
      if (!viewer) {
        return
      }
      const entities = viewer.entities.values
      entities.forEach((entity) => {
        entity.show = this.visibleSatellites.includes(entity.id)
      })
      if (this.visibleSatellites.length > entities.length) {
        // we need to restore the lost entities
        this.displayObjects(Cesium, viewer)
      }
    },
    toggleSunlight() {
      this.showSunlight = !this.showSunlight
      const scene = viewer.scene
      const globe = scene.globe

      globe.enableLighting = this.showSunlight
      scene.sun.show = this.showSunlight
    },
    ...mapMutations({
      updateDetailedSatellite: 'satellites/updateDetailedSatellite'
    })
  }
}
</script>
