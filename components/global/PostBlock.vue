<template>
  <article class="post-component post-component--wide">
    <header>
      <h2>
        <img :src="'./' + data.featureImage.key" alt="" />
        {{ data.featureImage.key }}
        <nuxt-link :to="nestedSlug">{{ data.title }}</nuxt-link>
      </h2>
      {{ data.authors.items[0].author.name }}
      {{ data.tagIDs }}
      {{ data.postDate }}
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
          tagIDs: '',
          title: '',
          postDate: '',
          authors: '',
          excerpt: '',
          slug: '',
          featureImage: '',
          featureImageCaption: ''
        }
      }
    }
  },
  computed: {
    nestedSlug() {
      return `analysis/${this.data.slug}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
</style>
