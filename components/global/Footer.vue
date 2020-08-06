<template>
  <footer class="footer">
    <Navigation name="footer" />
    <Social />
    <Copyright />
  </footer>
</template>

<script>
import Copyright from '~/components/global/Copyright.vue'
import Social from '~/components/global/SocialMedia.vue'
import Navigation from '~/components/global/Navigation.vue'

export default {
  components: {
    Copyright,
    Social,
    Navigation
  }
}
</script>

<style lang="scss"></style>
