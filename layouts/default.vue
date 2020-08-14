<template>
  <div>
    <SiteLogo />
    Site Header
    <SocialShare page-title="Foobar" />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Footer from '~/components/global/Footer.vue'
import SocialShare from '~/components/global/SocialShare.vue'

export default {
  components: {
    Footer,
    SiteLogo,
    SocialShare
  }
}
</script>
