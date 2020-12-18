<template>
  <header class="header">
    <nuxt-link to="/">
      <SiteLogo />
    </nuxt-link>
    <Navigation class="header__nav" name="header" />
    <SocialShare page-title="Sat Dash" />
  </header>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Navigation from '~/components/global/Navigation.vue'
import SocialShare from '~/components/global/SocialShare.vue'

export default {
  components: {
    Navigation,
    SiteLogo,
    SocialShare
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
</style>
