<template>
  <div class="nav" :class="parentClass">
    <h2 v-if="parentClass == 'nav--footer'">Navigate</h2>
    <ul class="nav__list" role="list">
      <li
        v-for="item in items"
        :key="item.id"
        :class="[parentClass + '__' + item.id, parentClass + '__item']"
        class="nav__item"
      >
        <nuxt-link :to="item.url">{{ item.title }}</nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="'?satids=41543,28629&date=2021-03-02&time=43200&timescale=day'"
        >
          Test Q string
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="
            '?satids=11570,21052,16667&date=2021-02-28&time=86400&timescale=week'
          "
        >
          Test Q string
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/'"> clear Q string </nuxt-link>
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
          title: 'Methodology',
          url: '/methodology',
          id: 'methodology'
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
      return `nav--${this.name}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/navigation';
</style>
