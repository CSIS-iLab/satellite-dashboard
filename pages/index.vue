<template>
  <div>
    <PanelLeft />
    <template v-if="loading"> Loading... </template>
    <template v-else>
      <CesiumViewer
        :satellites="satellites"
        :active-satellites="activeSatellites"
        :selected-date="targetDate"
      />

      <Timeline :selected-date="targetDate" />
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
    ...mapGetters({
      activeSatellites: 'satellites/activeSatellites'
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

table {
  color: #fff;
  border-collapse: collapse;

  td {
    padding: 8px;
    vertical-align: top;
  }
}
</style>
