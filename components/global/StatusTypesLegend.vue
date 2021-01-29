<template>
  <ul class="status-types" role="list">
    <li v-for="key in keys" :key="key" :data-status="key">
      {{ types[key].label }}
    </li>
  </ul>
</template>

<script>
import StatusTypes from '~/assets/data/status_types.json'

export default {
  name: 'StatusTypesLegend',
  computed: {
    types() {
      return StatusTypes
    },
    keys() {
      return Object.keys(this.types)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/status-types';
</style>
