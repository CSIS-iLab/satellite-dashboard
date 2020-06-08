<template>
  <footer class="footer">
    <Copyright />
    <Icon name="twitter" />
  </footer>
</template>

<script>
import Copyright from '~/components/global/Copyright.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    Copyright,
    Icon
  }
}
</script>

<style lang="scss"></style>
