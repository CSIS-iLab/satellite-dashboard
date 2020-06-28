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
import * as satellite from 'satellite.js'

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
      contrast: 1
    }
  },
  mounted() {
    this.$refs.vcViewer.createPromise.then(({ Cesium, viewer }) => {
      console.log('viewer is loaded.')
    })
  },
  methods: {
    ready(cesiumInstance) {
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

      // console.log(this.satellites)
      const time = new Date()

      console.log(this.satellites)

      const sat = this.satellites[0]
      // const tle = this.calcTLE(sat)
      // console.log(tle)

      // // const coordinates = getLatLngObj(tle)

      // const satrec = satellite.twoline2satrec(tle[0], tle[1])

      // var positionAndVelocity = satellite.propagate(satrec, time)
      // var positionEci = positionAndVelocity.position
      // var gmst = satellite.gstime(time)
      // var positionGd = satellite.eciToGeodetic(positionEci, gmst)
      // console.log(positionGd)
      // const { longitude, latitude, height } = positionGd

      // let orbit = []
      // const newTime = time
      // for (let i = 0; i <= 150; i++) {
      //   // figure out the time
      //   newTime.setMinutes(newTime.getMinutes() + i * 10)
      //   // get the coordinates at the new time
      //   let positionAndVelocity = satellite.propagate(satrec, newTime)
      //   let positionEci = positionAndVelocity.position
      //   let gmst = satellite.gstime(newTime)
      //   let positionGd = satellite.eciToGeodetic(positionEci, gmst)
      //   const { longitude, latitude, height } = positionGd
      //   // update the orbit
      //   orbit = orbit.concat([longitude, latitude, height])
      // }

      const heightDefault = 404.8 * 1000

      for (let i = 0; i < this.satellites.length; i++) {
        const sat = this.satellites[i]
        const tle = this.calcTLE(sat)

        if (!tle) {
          continue
        }

        const satrec = satellite.twoline2satrec(tle[0], tle[1])

        var positionAndVelocity = satellite.propagate(satrec, time)
        var positionEci = positionAndVelocity.position
        // var gmst = satellite.gstime(time)
        // var positionGd = satellite.eciToGeodetic(positionEci, gmst)
        // const { longitude, latitude, height } = positionGd
        const { x, y, z } = positionEci

        let orbit = []
        const newTime = time

        if (i === 0) {
          for (let i = 0; i <= 150; i++) {
            // figure out the time
            newTime.setMinutes(newTime.getMinutes() + i * 10)
            // get the coordinates at the new time
            let positionAndVelocity = satellite.propagate(satrec, newTime)
            let positionEci = positionAndVelocity.position
            const { x, y, z } = positionEci
            // update the orbit
            orbit = orbit.concat([x * 1000, y * 1000, z * 1000])
          }
          console.log(tle)
          console.log({ x, y, z, orbit })
        }

        viewer.entities.add({
          id: sat.id,
          position: Cesium.Cartesian3.fromElements(
            x * 1000,
            y * 1000,
            z * 1000
          ),
          point: {
            pixelSize: 5,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWiddth: 2
          },
          polyline: {
            positions: Cesium.Cartesian3.fromArray(orbit),
            width: 5,
            followSurface: true,
            material: Cesium.Color.BLUE
          }
        })
      }

      // viewer.entities.add({
      //   id: 'test',
      //   position: Cesium.Cartesian3.fromRadians(longitude, latitude, height),
      //   point: {
      //     pixelSize: 5,
      //     color: Cesium.Color.RED,
      //     outlineColor: Cesium.Color.WHITE,
      //     outlineWiddth: 2
      //   }
      // })

      // viewer.entities.add({
      //   id: 'test orbit',
      //   polyline: {
      //     positions: Cesium.Cartesian3.fromRadiansArrayHeights(orbit),
      //     width: 5,
      //     followSurface: true,
      //     material: Cesium.Color.RED
      //   }
      // })
    },
    calcTLE(sat) {
      const { id, orbitalDatum } = sat
      const items = orbitalDatum.items
      if (items.length <= 0) {
        return
      }
      const datum = items[0]
      const elemsNames = Object.keys(datum)

      let elems = {}

      for (let i = 0; i < elemsNames.length; i++) {
        const name = elemsNames[i]
        let value = datum[name].value
        if (name !== 'epoch') {
          value = +value
        }
        elems[name] = value
      }

      const epoch = elems.epoch.split('T')
      const epochDate = new Date(epoch[0])
      const year = epochDate
        .getFullYear()
        .toString()
        .substr(-2)
      const daysIntoYear = this.daysIntoYear(epochDate)

      const fractionOfDay = this.fractionOfDay(epoch[1])

      const inclination = this.radiansToDegrees(elems.inc)
      const RAAN = this.radiansToDegrees(elems.RAAN)
      const argP = this.radiansToDegrees(elems.argP)
      const meanAnom = this.radiansToDegrees(elems.meanAnom)
      const meanMotion = this.calcMeanMotion(elems.SMA)
      const ecc = this.calcEcc(elems.ecc)

      const line1 = `1 ${id}U 00000AAA ${year}${daysIntoYear}${fractionOfDay} -.00000000  00000-0 -00000-0 0  0000`
      const line2 = `2 ${id} ${inclination} ${RAAN} ${ecc} ${argP} ${meanAnom} ${meanMotion}000000`

      return [line1, line2]
    },
    daysIntoYear(date) {
      return (
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
          Date.UTC(date.getFullYear(), 0, 0)) /
        24 /
        60 /
        60 /
        1000
      )
    },
    fractionOfDay(time) {
      const value = Number.parseFloat(
        this.hmsToSecondsOnly(time) / 86400
      ).toFixed(8)

      return value.substr(1)
    },
    hmsToSecondsOnly(str) {
      var p = str.split(':'),
        s = 0,
        m = 1

      while (p.length > 0) {
        s += m * parseInt(p.pop(), 10)
        m *= 60
      }

      return s
    },
    radiansToDegrees(value) {
      let degrees = value * (180 / Math.PI)

      if (degrees < 0) {
        degrees += 360
      }

      let prefix = ''
      if (degrees < 100 && degrees >= 10) {
        prefix = '0'
      } else if (degrees < 10) {
        prefix = '00'
      }

      return prefix + Number.parseFloat(degrees).toFixed(4)
    },
    calcMeanMotion(value) {
      const mu = 3.986004415e14
      const meanMotion =
        Math.sqrt(mu / Math.pow(value, 3)) * (86400 / (2 * Math.PI))

      let prefix = ''
      if (meanMotion < 10) {
        prefix = ' '
      }

      return prefix + Number.parseFloat(meanMotion).toFixed(8)
    },
    calcEcc(ecc) {
      const value = Number.parseFloat(
        Math.round(ecc * Math.pow(10, 7))
      ).toString()
      return value.padStart(7, '0')
    }
  }
}

// console.log(Viewer)
</script>

<style lang="scss">
.viewer {
  width: 100%;
  height: 800px;
}
</style>
