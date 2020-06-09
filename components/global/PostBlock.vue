<template>
  <article class="post-component post-component--wide post-block">
    <div v-if="data.eventTypes.items[0]" class="post-block__category">
      {{ data.eventTypes.items[0].eventType.name }}
    </div>
    <nuxt-link class="post-block__image" :to="nestedSlug">
      <!-- <img class="post-block__image" :src="'./' + getImage" alt="" /> -->
      <img src="http://placekitten.com/200/138" />
    </nuxt-link>
    <h2 class="post-block__title">
      <nuxt-link :to="nestedSlug">{{ data.title }}</nuxt-link>
    </h2>
    <div class="post-meta">
      <div class="post-meta__block post-block__date">
        <span class="post-meta__label">Published</span>
        {{ formatDate }}
      </div>
      <div class="post-meta__block post-block__author">
        <span class="post-meta__label">Written By</span>
        {{ getAuthor }}
      </div>
    </div>
    <div class="post-block__excerpt">
      {{ data.excerpt }}
    </div>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          eventTypes: '',
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
    },
    getAuthor() {
      if (!this.data.authors.items[0]) {
        return
      }
      return this.data.authors.items[0].author.name
    },
    getImage() {
      if (!this.data.featureImage.key) {
        return
      }
      return this.data.featureImage.key
    },
    formatDate() {
      let date = new Date(this.data.postDate)
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      return date.toLocaleDateString('en', options)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/components/post-block';
@import '../assets/css/components/post-meta';
</style>
