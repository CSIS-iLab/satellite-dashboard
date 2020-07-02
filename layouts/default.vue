<template>
  <div>
    Site Header
    <SocialShare />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/global/Footer.vue'
import SocialShare from '~/components/global/SocialShare.vue'

export default {
  components: {
    Footer,
    SocialShare
  }
}
</script>
