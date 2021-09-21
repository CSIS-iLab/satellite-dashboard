<template>
  <div class="visualizer-content">
    <template v-if="loading"> Loading... </template>
    <template v-else>
      <PanelLeft />
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
      <UpdatesPanel />
      <MagicChart v-if="showMagicChart" />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CesiumViewer from '~/components/visualizer/CesiumViewer'
import PanelLeft from '~/components/visualizer/PanelLeft'
import Timeline from '~/components/timeline/Timeline'
import UpdatesPanel from '~/components/visualizer/UpdatesPanel'
import MagicChart from '~/components/visualizer/MagicChart'

export default {
  layout: 'visualizer',
  components: {
    CesiumViewer,
    DetailsPanel: () => import('~/components/visualizer/details-panel/Panel'),
    PanelLeft,
    Timeline,
    UpdatesPanel,
    MagicChart
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
      selectedTimescale: (state) => state.satellites.selectedTimescale,
      showMagicChart: (state) => state.layout.showMagicChart
    })
  },
  async created() {
    if (this.$route.query.date) {
      this.getOrbits({ date: this.$route.query.date })
    } else {
      this.getOrbits()
    }
    this.loading = false
    await this.getITUData()
  },
  methods: {
    ...mapActions({
      getOrbits: 'satellites/getOrbits',
      getITUData: 'satellites/getITUData'
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/pages/visualizer';
</style>
