<template>
  <div class="nav" :class="parentClass">
    <p v-if="parentClass == 'nav-footer'" :class="parentClass + '__title'">
      Navigate
    </p>
    <ul :class="parentClass + '__list'">
      <li
        v-for="item in items"
        :key="item.id"
        :class="[parentClass + '__' + item.id, parentClass + '__item']"
      >
        <nuxt-link :to="item.url">{{ item.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import json from 'static/navigation.json'
export default {
  name: 'Navigation',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Visualizer',
          url: '/',
          id: 'visualizer'
        },
        {
          title: 'Key Events',
          url: '/key-events',
          id: 'key-events'
        },
        {
          title: 'Analysis',
          url: '/analysis',
          id: 'analysis'
        },
        {
          title: 'About',
          url: '/about',
          id: 'about'
        },
        {
          title: 'Glossary',
          url: '/glossary',
          id: 'glossary'
        }
      ]
    }
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
