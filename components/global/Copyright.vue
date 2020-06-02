<template>
  <div class="copyright">
    &copy; {{ year }}
    <span>
      <nuxt-link to="/about#license">Licensing Information</nuxt-link>
    </span>
    <span>
      <a href="https://www.csis.org/privacy-policy">Privacy Policy</a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Copyright',
  data: function() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/copyright';
</style>
