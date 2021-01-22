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
      <p class="details-panel__desc">
        Updated from {{ orbitSource }}<br />Current as of {{ currentDate }}
      </p>
      <dl class="details__orbit">
        <div v-for="item in info.orbit" :key="item.value">
          <!-- eslint-disable -->
          <dt v-html="item.label"></dt>
          <dd v-html="formattedOrbitData[item.value]"></dd>
          <!-- eslint-enable -->
        </div>
      </dl>
    </div>
    <hr />
    <h3>ITU Filings</h3>
    <hr />
    <h3>Comments</h3>
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
          { value: 'Apogee', label: 'Apogee (km)' },
          { value: 'ArgP', label: 'Argument of perigee' },
          { value: 'Perigee', label: 'Perigee (km)' },
          { value: 'Ecc', label: 'Eccentricity' },
          { value: 'Inc', label: 'Inclination' },
          { value: 'Longitude', label: 'Longitude' },
          { value: 'MeanMotion', label: 'Mean Motion (&deg/s)' },
          { value: 'OrbitalPeriod', label: 'Orbital Period (min)' },
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
      const Apogee = this.orbit.SMA * (1 + this.orbit.Ecc) - this.earthRadius

      const Perigee = this.orbit.SMA * (1 - this.orbit.Ecc) - this.earthRadius

      const ArgP = `${((this.orbit.ArgP * 180) / Math.PI).toFixed(4)}&deg;`

      const Ecc = `${this.orbit.Ecc.toFixed(4)}`

      const Inc = `${this.orbit.Inc / Math.PI} &deg;`

      const mmo = Math.sqrt(
        this.mu / (this.orbit.SMA * this.orbit.SMA * this.orbit.SMA)
      )

      const MeanMotion = ((mmo * 180) / Math.PI).toFixed(4)

      const OrbitalPeriod = (Math.PI / mmo) * 30

      const SMA = `${(this.orbit.SMA / 1000).toFixed(1)} km`

      const OrbitalSpeed =
        ((2 * Math.PI * this.orbit.SMA) / OrbitalPeriod) *
        (1 -
          (1 / 4) * Ecc ** 2 -
          (3 / 64) * Ecc ** 4 -
          (5 / 256) * Ecc ** 6 -
          (175 / 16384) * Ecc ** 8)

      return {
        Apogee,
        ArgP,
        Perigee,
        Ecc,
        Inc,
        Longitude: null,
        MeanMotion,
        OrbitalPeriod,
        OrbitalSpeed,
        SMA
      }
    },
    status() {
      return this.satellite.meta.Status
    },
    orbitSource() {
      return `${this.satellite.meta.source1Name} ${this.formatDate(
        this.satellite.meta.source1LastCatalogUpdate
      )}`
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
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      return event.toLocaleString('en-US', options)
    }
  }
}
</script>

<style lang="scss"></style>
