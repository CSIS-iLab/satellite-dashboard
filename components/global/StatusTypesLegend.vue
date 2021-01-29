<template>
  <ul class="status-types" role="list">
    <li v-for="key in statusTypesKeys" :key="key" :data-status="key">
      {{ statusTypes[key].label }}
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'StatusTypesLegend',
  computed: {
    ...mapState({
      statusTypes: (state) => state.satellites.statusTypes
    }),
    ...mapGetters({
      statusTypesKeys: 'satellites/statusTypesKeys'
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/status-types';
</style>
