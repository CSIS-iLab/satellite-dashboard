<template>
  <div>
    <dl class="details__basic">
      <div v-for="item in info.basic" :key="item.value">
        <dt>{{ item.label }}</dt>
        <dd>{{ satellite.meta[item.value] }}</dd>
      </div>
      <div>
        <dt class="visually-hidden">Status</dt>
        <dd>
          <div
            class="sat__basic sat__basic--status"
            :data-status="satellite.meta.Status"
          >
            {{ status }}
          </div>
        </dd>
      </div>
    </dl>
    <hr />
    <dl class="details__advanced">
      <div v-for="item in info.advanced" :key="item.value">
        <dt>{{ item.label }}</dt>
        <dd>{{ satellite.meta[item.value] }}</dd>
      </div>
    </dl>
    <div v-if="hasOrbit">
      <hr />
      <h3>Orbit</h3>
      <p class="details-panel__desc">Last updated from {{ orbitSource }}</p>
      <dl class="details__orbit">
        <div v-for="item in info.orbit" :key="item.value">
          <!-- eslint-disable -->
          <dt v-html="item.label"></dt>
          <dd v-html="formattedOrbitData[item.value]"></dd>
          <!-- eslint-enable -->
        </div>
      </dl>
    </div>
    <!-- <hr />
    <h3>ITU Filings</h3>
    <hr />
    <h3>Comments</h3> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    satellite: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      info: {
        basic: [
          { value: 'Name', label: 'Alternate Name(s)' },
          { value: 'CatalogId', label: 'ID' }
        ],
        advanced: [
          { value: 'Purpose', label: 'Purpose' },
          { value: 'Type', label: 'Type' },
          { value: 'countryOfJurisdiction', label: 'Country of Jurisdiction' },
          { value: 'Operator', label: 'Operator' },
          { value: 'LaunchDate', label: 'Launch Date' },
          { value: 'countryOfLaunch', label: 'Country of Launch Site' },
          { value: 'LaunchSite', label: 'Launch Site' },
          { value: 'LaunchVehicle', label: 'Launch Vehicle' },
          { value: 'Contractor', label: 'Contractor' },
          { value: 'Lifetime', label: 'Lifetime' },
          { value: 'NoradId', label: 'NORAD ID (SATCAT)' }
        ],
        orbit: [
          { value: 'Apogee', label: 'Apogee Altitude (km)' },
          { value: 'ArgP', label: 'Argument of perigee' },
          { value: 'Perigee', label: 'Perigee Altitude (km)' },
          { value: 'Ecc', label: 'Eccentricity' },
          { value: 'Inc', label: 'Inclination' },
          { value: 'Longitude', label: 'Longitude' },
          { value: 'MeanMotion', label: 'Mean Motion (&deg/s)' },
          { value: 'OrbitalPeriod', label: 'Orbital Period' },
          { value: 'OrbitalSpeed', label: 'Mean Orbital Speed (km/s)' },
          { value: 'SMA', label: 'Semi-major axis (km)' }
        ]
      },
      earthRadius: 6378136.3, // m
      mu: 3.986004415e14 // m^3/s^2
    }
  },
  computed: {
    hasOrbit() {
      if (!this.satellite.orbits || this.satellite.orbits.length === -1) {
        return
      }

      return true
    },
    orbit() {
      // TODO: Need to get the right orbit for the current timeline
      return this.satellite.orbits[0].elements
    },
    formattedOrbitData() {
      const Apogee = `${this.formatNumbers(
        (this.orbit.SMA * (1 + this.orbit.Ecc) - this.earthRadius) / 1000
      )} km`

      const Perigee = `${this.formatNumbers(
        (this.orbit.SMA * (1 - this.orbit.Ecc) - this.earthRadius) / 1000
      )} km`

      const ArgP = `${this.formatNumbers(
        (this.orbit.ArgP * 180) / Math.PI,
        4
      )}&deg;`

      const Ecc = `${this.formatNumbers(this.orbit.Ecc, 4)}&deg;`

      const Inc = `${this.formatNumbers(this.orbit.Inc / Math.PI, 4)}&deg;`

      const mmo = Math.sqrt(
        this.mu / (this.orbit.SMA * this.orbit.SMA * this.orbit.SMA)
      )

      const MeanMotion = `${this.formatNumbers(
        (mmo * 180) / Math.PI,
        4
      )}&deg;/s`

      const OrbitalPeriod = (2 * Math.PI) / mmo
      const OrbitalPeriodDisplay = this.secondsToDhms(OrbitalPeriod)

      const SMA = `${this.formatNumbers(this.orbit.SMA / 1000)} km`

      const OrbitalSpeed = `
        ${this.formatNumbers(
          (((2 * Math.PI * this.orbit.SMA) / OrbitalPeriod) *
            (1 -
              (1 / 4) * this.orbit.Ecc ** 2 -
              (3 / 64) * this.orbit.Ecc ** 4 -
              (5 / 256) * this.orbit.Ecc ** 6 -
              (175 / 16384) * this.orbit.Ecc ** 8)) /
            1000,
          1
        )} km/s`

      return {
        Apogee,
        ArgP,
        Perigee,
        Ecc,
        Inc,
        Longitude: null,
        MeanMotion,
        OrbitalPeriod: OrbitalPeriodDisplay,
        OrbitalSpeed,
        SMA
      }
    },
    status() {
      return this.satellite.meta.Status
    },
    orbitSource() {
      return `${this.formatDate(this.satellite.meta.source1LastCatalogUpdate)}`
    },
    currentDate() {
      return this.formatDate(this.satellite.orbits[0].epoch)
    }
  },
  methods: {
    formatDate(date) {
      const event = new Date(date)

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      return event.toLocaleString('en-US', options)
    },
    secondsToDhms(seconds) {
      seconds = Number(seconds)
      const d = Math.floor(seconds / (3600 * 24))
      const h = Math.floor((seconds % (3600 * 24)) / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = Math.floor(seconds % 60)

      const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
      const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
      const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
      const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
      return dDisplay + hDisplay + mDisplay + sDisplay
    },
    formatNumbers(num, minDecimals = 0) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: minDecimals
      })
    }
  }
}
</script>

<style lang="scss"></style>
