<template>
  <svg class="icon" :class="iconClass" :title="name">
    <use :xlink:href="iconURL"></use>
  </svg>
</template>

<script>
export default {
  name: 'Copyright',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconClass() {
      return `icon-${this.name}`
    },
    iconURL() {
      return `/symbols.svg#icon-${this.name}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/icon';
</style>
