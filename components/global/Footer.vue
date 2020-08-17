<template>
  <footer class="footer">
    <SiteLogo />
    <p class="footer__description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores
      modi adipisci inventore, nihil cumque. Cumque, sit ipsam? Est aperiam
      doloremque esse nihil? Asperiores provident ullam incidunt qui nostrum
      nam!
    </p>
    <Social />
    <Navigation name="footer" />
    <LearnMoreAbout name="footer" />
    <Copyright />
  </footer>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Copyright from '~/components/global/Copyright.vue'
import Social from '~/components/global/SocialMedia.vue'
import Navigation from '~/components/global/Navigation.vue'
import LearnMoreAbout from '~/components/global/LearnMoreAbout.vue'

export default {
  components: {
    SiteLogo,
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
