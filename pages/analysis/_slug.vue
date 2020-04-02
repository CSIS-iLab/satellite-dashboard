<template>
  <article>
    <h1>{{ title }}</h1>
    <!-- eslint-disable-next-line -->
    <div v-html="content"></div>
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
      title: this.title
    }
  }
}
</script>
