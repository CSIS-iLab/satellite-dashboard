<template>
  <div>
    <SiteLogo />
    Site Header
    <SocialShare page-title="Foobar" />
    <nuxt />
    <TextInput />
    <Checkbox />
    <Footer />
  </div>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Footer from '~/components/global/Footer.vue'
import SocialShare from '~/components/global/SocialShare.vue'
import TextInput from '~/components/global/TextInput.vue'
import Checkbox from '~/components/global/Checkbox.vue'

export default {
  components: {
    Footer,
    SiteLogo,
    SocialShare,
    TextInput,
    Checkbox
  }
}
</script>
