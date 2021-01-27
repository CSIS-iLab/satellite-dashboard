<template>
  <div>
    <PanelLeft />
    <template v-if="loading"> Loading... </template>
    <template v-else>
      <CesiumViewer
        :satellites="satellites"
        :active-satellites="activeSatellites"
        :selected-date="targetDate"
        :selected-timescale="selectedTimescale.value"
      />

      <Timeline
        :selected-date="targetDate"
        :timescales="timescales"
        :selected-timescale="selectedTimescale"
      />
      <DetailsPanel
        v-if="detailedSatellite"
        :id="detailedSatellite"
        :satellite="detailedSatelliteInfo"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CesiumViewer from '~/components/visualizer/CesiumViewer'
import PanelLeft from '~/components/visualizer/PanelLeft'
import Timeline from '~/components/timeline/Timeline'

export default {
  layout: 'visualizer',
  components: {
    CesiumViewer,
    DetailsPanel: () => import('~/components/visualizer/details-panel/Panel'),
    PanelLeft,
    Timeline
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    satellites() {
      return this.$store.state.satellites.satellites
    },
    targetDate() {
      return this.$store.state.satellites.targetDate
    },
    timescales() {
      return this.$store.state.satellites.timescales
    },
    selectedTimescale() {
      return this.$store.state.satellites.selectedTimescale
    },
    detailedSatelliteInfo() {
      return this.satellites[this.detailedSatellite]
    },
    ...mapGetters({
      activeSatellites: 'satellites/activeSatellites',
      detailedSatellite: 'satellites/detailedSatellite'
    })
  },
  created() {
    this.$store.dispatch('satellites/getSatellites')
    this.loading = false
  },
  methods: {
    openFilters() {
      console.log('open filters')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/pages/visualizer';
</style>
