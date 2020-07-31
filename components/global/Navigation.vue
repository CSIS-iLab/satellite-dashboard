<template>
  <div class="nav" :class="parentClass">
    <p class="is-footer">Navigate</p>
    <ol :class="parentClass + '__list'">
      <li
        v-for="page in data"
        :key="page.id"
        :class="[parentClass + '__' + page.id, parentClass + '__item']"
      >
        <nuxt-link :to="page.url">{{ page.title }}</nuxt-link>
      </li>
    </ol>
  </div>
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
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/navigation';
</style>
