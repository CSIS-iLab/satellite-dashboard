<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__main">
        <SiteLogo />
        <p class="footer__desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          dolores modi adipisci inventore, nihil cumque. Cumque, sit ipsam? Est
          aperiam doloremque esse nihil? Asperiores provident ullam incidunt qui
          nostrum nam!
        </p>
        <Social />
      </div>
      <Navigation class="footer__nav" name="footer" />
      <div class="footer__organizations">
        <h2>
          Learn More About
        </h2>
        <ul>
          <li
            v-for="item in items"
            :key="item.id"
            class="footer__organizations-item"
          >
            <a :href="item.url">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <Copyright class="footer__copyright" />
    </div>
  </footer>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Copyright from '~/components/global/Copyright.vue'
import Social from '~/components/global/SocialMedia.vue'
import Navigation from '~/components/global/Navigation.vue'

export default {
  name: 'Footer',
  components: {
    SiteLogo,
    Copyright,
    Social,
    Navigation
  },

  data() {
    return {
      items: [
        {
          title: 'Center for Strategic and International Studies',
          url: 'https://www.csis.org',
          id: 'csis'
        },
        {
          title: 'Secure World Foundation',
          url: 'https://swfound.org/',
          id: 'swf'
        },
        {
          title: 'University of Texas at Austin',
          url: 'https://www.utexas.edu/',
          id: 'uta'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/layout/footer';
</style>
