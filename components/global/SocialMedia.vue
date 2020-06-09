<template>
  <div class="social-media">
    <Icon class="icon" id="twitter" name="twitter" /><a
      id="twitter-link"
      href="https://twitter.com/satdashboard"
      >@satdashboard</a
    >
    <Icon id="email" class="icon" name="email" />
    <a href="mailto: spacetranspraencyproject@gmail.com"
      >spacetransparencyproject@gmail.com</a
    >
  </div>
</template>

<script>
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'Social',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/social-media';
</style>
