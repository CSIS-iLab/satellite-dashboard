<template>
  <ul class="social-media">
    <li class="list-items">
      <Icon id="twitter" class="icon" name="twitter" /><a
        id="twitter-link"
        href="https://twitter.com/satdashboard"
        >@satdashboard</a
      >
    </li>
    <li class="list-items">
      <Icon id="email" class="icon" name="email" />
      <a href="mailto: spacetranspraencyproject@gmail.com"
        >spacetransparencyproject@gmail.com</a
      >
    </li>
  </ul>
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
