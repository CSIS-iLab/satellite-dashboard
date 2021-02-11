<template>
  <div class="container">
    <header class="page__header">
      <h1 class="page__title">{{ title }}</h1>
      <slot name="header"></slot>
    </header>
    <main class="page__content" :class="{ 'page__content--bg': contentHasBg }">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    contentHasBg: {
      type: Boolean,
      default: false
    }
  },
  head() {
    return {
      title: this.title,
      bodyAttrs: {
        class: `page-layout page--${this.$route.name}`
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/pages/page';
</style>
