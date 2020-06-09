<template>
  <footer class="footer">
    <Icon name="twitter" />
    <Icon name="email" />
    <Social />
    <Copyright />
  </footer>
</template>

<script>
import Copyright from '~/components/global/Copyright.vue'
import Icon from '~/components/global/Icon.vue'
import Social from '~/components/global/SocialMedia.vue'

export default {
  components: {
    Copyright,
    Icon,
    Social
  }
}
</script>

<style lang="scss"></style>
