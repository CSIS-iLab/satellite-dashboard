<template>
  <ol :class="parentClass">
    <li class="visualizer">
      <nuxt-link :to="nestedSlug" append>Visualizer</nuxt-link>
    </li>
    <li>Visualizer</li>
  </ol>
</template>

<script>
import json from 'static/navigation.json'
export default {
  name: 'Navigation',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return { data: json }
  },
  computed: {
    parentClass() {
      return `nav-${this.name}`
    },
    nestedSlug() {
      console.log(this.data)
      return `${this.data.visualizer.url}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/navigation';
</style>
