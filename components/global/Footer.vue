<template>
  <footer class="footer">
    <div class="footer__main">
      <SiteLogo />
      <p class="footer__desc">
        The Satellite Dashboard is an analysis and visualization tool to help
        readers better understand space situational awareness (SSA) data, with a
        focus on particularly interesting on-orbit activities. Learn more
        <nuxt-link to="/about">here</nuxt-link>.
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
