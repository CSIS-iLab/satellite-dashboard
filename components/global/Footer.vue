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
    <div class="wrapper">
      <Navigation name="footer" />
      <div class="footer__learnMoreAbout" :class="parentClass">
        <h2 class="footer__learnMoreAboutHeader">
          Learn More About
        </h2>
        <ul :class="parentClass + '__list'">
          <li
            v-for="item in items"
            :key="item.id"
            :class="[parentClass + '__' + item.id, parentClass + '__item']"
            class="footer__learnMoreAbout__item"
          >
            <a :href="item.url">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <Copyright />
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
          id: 'center-for-strategic-and-international-studies'
        },
        {
          title: 'Secure World Foundation',
          url: 'https://swfound.org/',
          id: 'secure-world-foundation'
        },
        {
          title: 'University of Texas at Austin',
          url: 'https://www.utexas.edu/',
          id: 'universtiy-of-texas-at-austin'
        }
      ]
    }
  },
  computed: {
    parentClass() {
      return `footer__learnMoreAbout--${this.name}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/layout/footer';
</style>
