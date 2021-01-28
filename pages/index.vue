<template>
  <div>
    <PanelLeft />
    <template v-if="loading"> Loading... </template>
    <template v-else>
      <CesiumViewer
        :satellite-orbits="orbits"
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
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
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
    detailedSatelliteInfo() {
      return this.satellites[this.detailedSatellite]
    },
    ...mapState({
      orbits: (state) => state.satellites.orbits,
      targetDate: (state) => state.satellites.targetDate,
      timescales: (state) => state.satellites.timescales,
      selectedTimescale: (state) => state.satellites.selectedTimescale
    }),
    ...mapGetters({
      activeSatellites: 'satellites/activeSatellites',
      detailedSatellite: 'satellites/detailedSatellite'
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
