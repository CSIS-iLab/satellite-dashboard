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
    <h2 class="footer__learnAboutMoreHeader">Learn More About</h2>
    <ul class="footer__learnAboutMore">
      <li>
        <p><a href="">CSIS</a></p>
      </li>
      <li>
        <p><a href="#">Secure World Foundation</a></p>
      </li>
      <li>
        <p><a href="#">University of Texas at Austin</a></p>
      </li>
    </ul>
    <Copyright />
  </footer>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Copyright from '~/components/global/Copyright.vue'
import Social from '~/components/global/SocialMedia.vue'
import Navigation from '~/components/global/Navigation.vue'

export default {
  components: {
    SiteLogo,
    Copyright,
    Social,
    Navigation
  }
}
</script>

<style lang="scss">
@import '../assets/css/layout/footer';
</style>
