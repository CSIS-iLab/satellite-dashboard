<template>
  <div>
    <SiteLogo />
    Site Header
    <SocialShare page-title="Foobar" />
    <nuxt />
    <TextInput />
    <Footer />
  </div>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Footer from '~/components/global/Footer.vue'
import SocialShare from '~/components/global/SocialShare.vue'
import TextInput from '~/components/global/TextInput.vue'

export default {
  components: {
    Footer,
    SiteLogo,
    SocialShare,
    TextInput
  }
}
</script>
