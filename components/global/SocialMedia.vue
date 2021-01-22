<template>
  <ul class="social-media" role="list">
    <li class="social-media__item">
      <a id="twitter-link" href="https://twitter.com/satdashboard">
        <Icon id="twitter" class="icon" name="twitter" />
        @satdashboard
      </a>
    </li>
    <li class="social-media__item">
      <a href="mailto: spacetranspraencyproject@gmail.com">
        <Icon id="email" class="icon" name="email" />
        spacetransparencyproject@gmail.com
      </a>
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
