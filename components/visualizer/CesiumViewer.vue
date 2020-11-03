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
// import * as satellite from 'satellite.js' // Was used to create TLEs for propogation.

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
      SimInt: 90 * 60,
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
      for (let i = 0; i < this.satellites.length; i++) {
        const sat = this.satellites[i]
        const { id, orbitalDatum, name } = sat
        const items = orbitalDatum.items
        if (items.length <= 0) {
          continue
        }
        const datum = items[0]
        const elemsNames = Object.keys(datum)

        let elems = {}

        // Format orbital elements
        // Todo: Can this be refactored to happen elsewhere, such as in the database or when it is pulled into the app?
        for (let i = 0; i < elemsNames.length; i++) {
          const name = elemsNames[i]
          let value = datum[name].value
          if (name !== 'epoch') {
            value = +value
          }
          elems[name] = value
        }

        // TODO: Use actual epoch date
        // Cesium.JulianDate.fromIso8601('2020-06-13T22:00:02.000000Z', epjd)
        Cesium.JulianDate.fromIso8601(elems.epoch, epjd)
        // console.log(elems.epoch)
        // Cesium.JulianDate.fromIso8601(elems.epoch, epjd)
        let t = Cesium.JulianDate.daysDifference(this.SimStop, epjd)
        elems.mmo = Math.sqrt(EGM96_mu / (elems.SMA * elems.SMA * elems.SMA))
        elems.meanAnom = (elems.meanAnom + elems.mmo * t * 86400) % TwoPi

        // Calculate Orbit
        // TODO: This is computationally expensive. If orbits are only visible when the user has selected the object, is there a better way to handle these calculations?
        let orbit = []
        // if (i === 0) {
        orbit = this.calcOrbit(Cesium, viewer, CRFtoTRF, elems)
        console.log('orbit')
        console.log(orbit)
        // }

        // TODO: Adjust the availability & position properties. See https://github.com/ut-astria/AstriaGraph/blob/master/main.js#L212-L220 for reference.
        viewer.entities.add({
          id: id,
          name: name.value,
          // availability: new Cesium.TimeIntervalCollection([
          //   new Cesium.TimeInterval({
          //     start: this.SimStart,
          //     stop: this.SimStop
          //   })
          // ]),
          // position: new Cesium.CallbackProperty(
          //   this.updatePosition(Cesium, viewer, CRFtoTRF, elems),
          //   false
          // ),
          position: this.updatePosition(Cesium, viewer, CRFtoTRF, elems),
          point: {
            pixelSize: 7,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1
          },
          polyline: {
            positions: Cesium.Cartesian3.fromRadiansArrayHeights(orbit),
            width: 1,
            material: Cesium.Color.BLUE
          }
        })
      }
    },
    // Reference: https://github.com/ut-astria/AstriaGraph/blob/master/main.js#L228-L240
    updatePosition(Cesium, CsView, CRFtoTRF, elems) {
      // return function UpdateHelper() {
      var t = Cesium.JulianDate.secondsDifference(
        CsView.clock.currentTime,
        this.SimStart
      )
      var u = Object.assign({}, elems)
      u.meanAnom = (u.meanAnom + u.mmo * t) % TwoPi
      var eff = new Cesium.Cartesian3()
      var eci = this.eltocart(Cesium, u, true, 1e-3)
      Cesium.Matrix3.multiplyByVector(CRFtoTRF, eci, eff)
      return eff
      // }
    },
    // Reference: https://github.com/ut-astria/AstriaGraph/blob/master/celemech.js#L44
    eltocart(Cesium, ele, posonly = false, tol = 1e-6, MAXITER = 20) {
      var ecan = this.ecceanom(ele.meanAnom, ele.ecc, tol, MAXITER)
      var tran =
        2 *
        Math.atan2(
          Math.sqrt((1 + ele.ecc) / (1 - ele.ecc)) * Math.sin(ecan / 2),
          Math.cos(ecan / 2)
        )

      var p = ele.SMA * (1 - ele.ecc * ele.ecc)
      var r = p / (1 + ele.ecc * Math.cos(tran))
      var h = Math.sqrt(EGM96_mu * p)

      var ci = Math.cos(ele.inc)
      var si = Math.sin(ele.inc)
      var cr = Math.cos(ele.RAAN)
      var sr = Math.sin(ele.RAAN)
      var cw = Math.cos(ele.argP + tran)
      var sw = Math.sin(ele.argP + tran)

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
          (h * ele.ecc * Math.sin(tran)) / (r * p),
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
      let sta = []
      let arr = []
      let u = Object.assign({}, elems)
      for (u.meanAnom = 0; u.meanAnom <= 6.29; u.meanAnom += 0.01) {
        if (u.meanAnom === 0) {
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
        )
          continue
        arr.push(car.longitude, car.latitude, car.height)
      }
      return arr
    }
    // Below code was used to generate TLEs to satellite.js could be used for propagation.
    // calcTLE(sat) {
    //   const { id, orbitalDatum } = sat
    //   const items = orbitalDatum.items
    //   if (items.length <= 0) {
    //     return
    //   }
    //   const datum = items[0]
    //   const elemsNames = Object.keys(datum)

    //   let elems = {}

    //   for (let i = 0; i < elemsNames.length; i++) {
    //     const name = elemsNames[i]
    //     let value = datum[name].value
    //     if (name !== 'epoch') {
    //       value = +value
    //     }
    //     elems[name] = value
    //   }

    //   const epoch = elems.epoch.split('T')
    //   const epochDate = new Date(epoch[0])
    //   const year = epochDate
    //     .getFullYear()
    //     .toString()
    //     .substr(-2)
    //   const daysIntoYear = this.daysIntoYear(epochDate)

    //   const fractionOfDay = this.fractionOfDay(epoch[1])

    //   const inclination = this.radiansToDegrees(elems.inc)
    //   const RAAN = this.radiansToDegrees(elems.RAAN)
    //   const argP = this.radiansToDegrees(elems.argP)
    //   const meanAnom = this.radiansToDegrees(elems.meanAnom)
    //   const meanMotion = this.calcMeanMotion(elems.SMA)
    //   const ecc = this.calcEcc(elems.ecc)

    //   const line1 = `1 ${id}U 00000AAA ${year}${daysIntoYear}${fractionOfDay} -.00000000  00000-0 -00000-0 0  0000`
    //   const line2 = `2 ${id} ${inclination} ${RAAN} ${ecc} ${argP} ${meanAnom} ${meanMotion}000000`

    //   return [line1, line2]
    // },
    // daysIntoYear(date) {
    //   return (
    //     (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
    //       Date.UTC(date.getFullYear(), 0, 0)) /
    //     24 /
    //     60 /
    //     60 /
    //     1000
    //   )
    // },
    // fractionOfDay(time) {
    //   const value = Number.parseFloat(
    //     this.hmsToSecondsOnly(time) / 86400
    //   ).toFixed(8)

    //   return value.substr(1)
    // },
    // hmsToSecondsOnly(str) {
    //   var p = str.split(':'),
    //     s = 0,
    //     m = 1

    //   while (p.length > 0) {
    //     s += m * parseInt(p.pop(), 10)
    //     m *= 60
    //   }

    //   return s
    // },
    // radiansToDegrees(value) {
    //   let degrees = value * (180 / Math.PI)

    //   if (degrees < 0) {
    //     degrees += 360
    //   }

    //   let prefix = ''
    //   if (degrees < 100 && degrees >= 10) {
    //     prefix = '0'
    //   } else if (degrees < 10) {
    //     prefix = '00'
    //   }

    //   return prefix + Number.parseFloat(degrees).toFixed(4)
    // },
    // calcMeanMotion(value) {
    //   const mu = 3.986004415e14
    //   const meanMotion =
    //     Math.sqrt(mu / Math.pow(value, 3)) * (86400 / (2 * Math.PI))

    //   let prefix = ''
    //   if (meanMotion < 10) {
    //     prefix = ' '
    //   }

    //   return prefix + Number.parseFloat(meanMotion).toFixed(8)
    // },
    // calcEcc(ecc) {
    //   const value = Number.parseFloat(
    //     Math.round(ecc * Math.pow(10, 7))
    //   ).toString()
    //   return value.padStart(7, '0')
    // },
    // arrayToCartesianArray(array, Cesium) {
    //   let newArray = []
    //   for (let i = 0; i < array.length; i += 3) {
    //     let p = new Cesium.Cartesian3(array[i], array[i + 1], array[i + 2])
    //     newArray.push(p)
    //   }

    //   return newArray
    // }
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
