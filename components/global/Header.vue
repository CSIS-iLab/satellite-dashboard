<template>
  <header class="header">
    <nuxt-link to="/">
      <SiteLogo />
    </nuxt-link>
    <Navigation class="header__nav" name="header" />
    <SocialShare page-title="Sat Dash" />
    <Copyright />
  </header>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Navigation from '~/components/global/Navigation.vue'
import SocialShare from '~/components/global/SocialShare.vue'
import Copyright from '~/components/global/Copyright.vue'

export default {
  components: {
    Copyright,
    Navigation,
    SiteLogo,
    SocialShare
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/header';
</style>
