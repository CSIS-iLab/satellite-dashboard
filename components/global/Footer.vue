<template>
  <footer class="footer">
    <SiteLogo />
    <Paragraph />
    <Social />
    <Navigation name="footer" />
    <LearnMoreAbout />
    <Copyright />
  </footer>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Paragraph from '~/components/global/Paragraph.vue'
import Copyright from '~/components/global/Copyright.vue'
import Social from '~/components/global/SocialMedia.vue'
import Navigation from '~/components/global/Navigation.vue'
import LearnMoreAbout from '~/components/global/LearnMoreAbout.vue'

export default {
  components: {
    SiteLogo,
    Paragraph,
    Copyright,
    Social,
    Navigation,
    LearnMoreAbout
  }
}
</script>

<style lang="scss">
@import '../assets/css/layout/footer';
</style>
