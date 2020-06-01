<template>
  <article class="post-component post-component--wide">
    <header>
      {{ data.eventTypeIDs[0] }}
      <img :src="'./' + data.featureImage.key" alt="" />
      {{ data.featureImage.key }}
      <h2>
        <nuxt-link :to="nestedSlug">{{ data.title }}</nuxt-link>
      </h2>
      <div class="post-component post-component-meta">
        <div class="post-component post-component-meta__date">
          <p>Published</p>
          {{ data.postDate }}
        </div>
        <div class="post-component post-component-meta__author">
          <p>Written By</p>
          {{ data.authors.items[0].author.name }}
        </div>
      </div>
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
          eventTypeIDs: '',
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
