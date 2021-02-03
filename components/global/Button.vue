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
      required: false,
      default: () => {}
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
