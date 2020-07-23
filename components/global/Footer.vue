<template>
  <footer class="footer">
    <Social />
    <Copyright />
  </footer>
</template>

<script>
import Copyright from '~/components/global/Copyright.vue'
import Social from '~/components/global/SocialMedia.vue'

export default {
  components: {
    Copyright,
    Social
  }
}
</script>

<style lang="scss"></style>
