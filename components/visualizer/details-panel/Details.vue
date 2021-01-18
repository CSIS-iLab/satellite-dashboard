<template>
  <div>
    <dl class="details__basic">
      <div v-for="item in info.basic" :key="item.value">
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
      </div>
      <div>
        <dt class="visually-hidden">Status</dt>
        <dd>Status</dd>
      </div>
    </dl>
    <hr />
    <dl class="details__advanced">
      <div v-for="item in info.advanced" :key="item.value">
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
      </div>
    </dl>
    <hr />
    <h3>Orbit</h3>
    <p class="details-panel__desc">
      Updated from [SOURCE] [DATE]<br />Current as of [DATE]
    </p>
    <dl class="details__orbit">
      <div v-for="item in info.orbit" :key="item.value">
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
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
    meta() {
      console.log(this.satellite)
      return this.satellite
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
