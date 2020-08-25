<template>
  <button class="btn" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  // props: {
  //   onClick: {
  //     type: Function,
  //     required: trues
  //   }
  // }
}
</script>

<style lang="scss">
@import '../assets/css/components/button';
</style>
