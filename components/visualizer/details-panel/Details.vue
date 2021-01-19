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
    <hr />
    <h3>Orbit</h3>
    <p class="details-panel__desc">
      Updated from [SOURCE] [DATE]<br />Current as of [DATE]
    </p>
    <dl v-if="hasOrbit" class="details__orbit">
      <div v-for="item in info.orbit" :key="item.value">
        <dt>{{ item.label }}</dt>
        <dd>{{ orbit[item.value] }}</dd>
      </div>
      <div>
        <dt class="visually-hidden">Status</dt>
        <dd>Status</dd>
      </div>
    </dl>
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
          { value: 'ArgP', label: 'Argument of perigee' },
          { value: 'Ecc', label: 'Eccentricity' },
          { value: 'Inc', label: 'Inclination' },
          { value: 'SMA', label: 'Semi-major axis (km)' }
        ]
      }
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
      return this.satellite.orbits[0]
    },
    status() {
      return this.satellite.meta.Status
    }
  },
  methods: {
    zoomIn() {
      console.log('zoom in on this object')
    },
    toggleFocusState() {
      console.log('toggle focus state')
    },
    closePanel() {
      console.log('close panel')
    }
  }
}
</script>

<style lang="scss"></style>
