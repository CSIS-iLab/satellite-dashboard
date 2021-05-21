<template>
  <header class="site-header">
    <div class="site-header__masthead">
      <Button
        aria-label="Open Navigation Menu"
        class="btn--menu"
        :on-click="openNav"
      >
        <Icon
          id="menu"
          class="icon header__menu"
          name="menu"
          focusable="false"
        />
      </Button>
      <div class="site-nav" :class="navIsOpen ? 'site-nav--is-visible' : ''">
        <Button
          aria-label="Close Navigation Menu"
          class="btn--icon btn--close"
          :on-click="closeNav"
        >
          <Icon id="close-large" name="close-large" focusable="false" />
        </Button>
        <Navigation class="header__nav" name="header" />
        <div class="site-nav__footer">
          <SocialMedia />
          <Copyright />
        </div>
      </div>
      <nuxt-link to="/" class="site-logo">
        <SiteLogo />
      </nuxt-link>
    </div>
    <SocialShare v-if="!isVisualizer" page-title="Sat Dash" />
  </header>
</template>

<script>
import Button from '~/components/global/Button'
import SiteLogo from '~/components/global/SiteLogo.vue'
import Navigation from '~/components/global/Navigation.vue'
import SocialMedia from '~/components/global/SocialMedia'
import SocialShare from '~/components/global/SocialShare.vue'
import Copyright from '~/components/global/Copyright.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    Button,
    Copyright,
    Navigation,
    SiteLogo,
    SocialMedia,
    SocialShare,
    Icon
  },
  data() {
    return {
      navIsOpen: false
    }
  },
  computed: {
    isVisualizer() {
      return this.$nuxt.$data.layoutName === 'visualizer' ? true : false
    }
  },
  methods: {
    openNav() {
      console.log(this.$nuxt.$data.layoutName)
      this.navIsOpen = true
    },
    closeNav() {
      this.navIsOpen = false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/layout/site-header';
</style>
