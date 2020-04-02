<template>
  <article>
    <h1>{{ title }}</h1>
    <component :is="singlePostComponent" />
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
        singlePostComponent: post.vue.component
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
