<template>
  <article class="post-component post-component--wide post-block">
    <!-- <header> -->
    <div class="post-block__category">
      {{ getCategory }}
    </div>
    <!-- <img class="post-block__image" :src="'./' + getImage" alt="" /> -->
    <img class="post-block__image" src="http://placekitten.com/200/138" />
    <h2 class="post-block__title">
      <nuxt-link :to="nestedSlug">{{ data.title }}</nuxt-link>
    </h2>
    <!-- </header> -->
    <!-- <section class="post-block__content"> -->
    <div class="post-block__meta">
      <div class="post-block__date">
        <p class="post-block__date-label">Published</p>
        {{ data.postDate }}
      </div>
      <div class=" post-block__author">
        <p class="post-block__author-label">Written By</p>
        {{ getAuthor }}
      </div>
    </div>
    <div class="post-block__excerpt">
      {{ data.excerpt }}
    </div>
    <!-- </section> -->
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
    getCategory() {
      if (!this.data.eventTypes.items[0]) {
        return
      } else {
        return this.data.eventTypes.items[0].eventType.name
      }
    },
    getAuthor() {
      if (!this.data.authors.items[0]) {
        return
      } else {
        return this.data.authors.items[0].author.name
      }
    },
    getImage() {
      if (!this.data.featureImage.key) {
        return
      } else {
        return this.data.featureImage.key
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/components/post-block';
</style>
