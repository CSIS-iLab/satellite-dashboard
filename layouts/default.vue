<template>
  <div>
    <SiteLogo />
    Site Header
    <SocialShare page-title="Foobar" />
    <Button :on-click="onClick" />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Footer from '~/components/global/Footer.vue'
import SocialShare from '~/components/global/SocialShare.vue'
import Button from '~/components/global/Button.vue'

export default {
  components: {
    Footer,
    SiteLogo,
    SocialShare,
    Button
  },
  methods: {
    onClick() {
      console.log('Hello World')
    }
  }
}
</script>
