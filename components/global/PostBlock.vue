<template>
  <article class="post-component post-component--wide">
    <header>
      <h2>
        <nuxt-link :to="data.slug">{{ data.title }}</nuxt-link>
      </h2>
      {{ data.date }}
    </header>
    {{ data.excerpt }}
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          title: '',
          date: '',
          excerpt: '',
          slug: ''
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
</style>
