<template>
  <content :is="type" :href="href" class="btn" @click="onClick">
    <slot />
  </content>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true
    },
    href: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    }
  },
  computed: {
    type() {
      if (this.href) {
        return 'a'
      } else {
        return 'button'
      }
    }
  }
}
</script>
<!--<template>
  <button class="btn" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script> -->

<style lang="scss">
@import '../assets/css/components/button';
</style>
