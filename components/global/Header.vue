<template>
  <header class="header">
    <Icon id="menu" class="icon header__menu" name="menu" />
    <nuxt-link to="/">
      <SiteLogo />
    </nuxt-link>
    <Navigation class="header__nav" name="header" />
    <SocialShare page-title="Sat Dash" />
    <Social />
    <Copyright />
  </header>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Navigation from '~/components/global/Navigation.vue'
import SocialShare from '~/components/global/SocialShare.vue'
import Copyright from '~/components/global/Copyright.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    Copyright,
    Navigation,
    SiteLogo,
    SocialShare,
    Icon
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/header';
</style>
