<template>
  <div>
    <template v-if="loading"> Loading... </template>

    <template v-else>
      <CesiumViewer :satellites="satellites" :selected-date="targetDate" />

      <Timeline :selected-date="targetDate" />
    </template>
  </div>
</template>

<script>
import CesiumViewer from '~/components/visualizer/CesiumViewer'
import Timeline from '~/components/timeline/Timeline'

export default {
  layout: 'visualizer',
  components: {
    CesiumViewer,
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
    }
  },
  created() {
    this.$store.dispatch('satellites/getSatellites')
    this.loading = false
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
