<template>
  <div class="panel" :class="'panel--' + direction">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/panel';
</style>
