<template>
  <div class="visualizer-content">
    <!-- <PanelLeft /> -->
    <template v-if="loading"> Loading... </template>
    <template v-else>
      <CesiumViewer
        :satellite-orbits="orbits"
        :visible-satellites="visibleSatellites"
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
      <UpdatePanel />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CesiumViewer from '~/components/visualizer/CesiumViewer'
// import PanelLeft from '~/components/visualizer/PanelLeft'
import Timeline from '~/components/timeline/Timeline'
import UpdatePanel from '~/components/visualizer/UpdatesPanel'

export default {
  layout: 'visualizer',
  components: {
    CesiumViewer,
    DetailsPanel: () => import('~/components/visualizer/details-panel/Panel'),
    // PanelLeft,
    Timeline,
    UpdatePanel
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    detailedSatelliteInfo() {
      return this.satellites[this.detailedSatellite]
    },
    ...mapState({
      satellites: (state) => state.satellites.satellites,
      orbits: (state) => state.satellites.orbits,
      visibleSatellites: (state) => state.satellites.visibleSatellites,
      detailedSatellite: (state) => state.satellites.detailedSatellite,
      targetDate: (state) => state.satellites.targetDate,
      timescales: (state) => state.satellites.timescales,
      selectedTimescale: (state) => state.satellites.selectedTimescale
    })
  },
  created() {
    this.getOrbits()
    this.loading = false
  },
  methods: {
    openFilters() {
      console.log('open filters')
    },
    ...mapActions({
      getOrbits: 'satellites/getOrbits'
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/pages/visualizer';
</style>
