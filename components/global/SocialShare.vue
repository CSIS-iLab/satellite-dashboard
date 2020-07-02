<template>
  <ul class="social-share">
    <li class="list-items">
      <Icon id="facebook" class="icon" name="facebook" />
    </li>
    <li>
      <Icon id="twitter" class="icon" name="twitter" />
    </li>
    <li>
      <Icon id="linkedin" class="icon" name="linkedin" />
    </li>
    <li>
      <Icon id="email" class="icon" name="email" />
    </li>
    <li>
      <Icon id="link" class="icon" name="link" />
    </li>
  </ul>
</template>

<script>
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'SocialShare',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/social-share';
</style>
