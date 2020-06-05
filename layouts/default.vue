<template>
  <div>
    Site Header
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/global/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>
