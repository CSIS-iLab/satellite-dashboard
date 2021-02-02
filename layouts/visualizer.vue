<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/global/Header.vue'

export default {
  components: {
    Header
  },
  head: {
    bodyAttrs: {
      class: 'visualizer'
    }
  }
}
</script>
