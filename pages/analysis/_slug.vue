<template>
  <article class="post container">
    <header class="post__header">
      <h1>{{ title }}</h1>
    </header>
    <!-- eslint-disable-next-line -->
    <section class="post__content" v-html="content"></section>
  </article>
</template>
<script>
export default {
  async asyncData({ params }) {
    try {
      const post = await import(`~/content/analysis/${params.slug}.md`)
      const { title, date } = post.attributes

      return {
        title,
        date,
        content: post.html
      }
    } catch (error) {
      return false
    }
  },
  head() {
    return {
      title: this.title,
      bodyAttrs: {
        class: 'page-layout'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';

.post {
  &__header {
    @extend %page-header;
  }

  &__content {
    @extend %page-content;
    @extend %page-content-bg;

    > *:not([class]) {
      padding: 0 calc(50% - #{$size__content-max-width} / 2);
    }
  }
}
</style>
