<template>
  <article class="post-component post-component--wide post-block">
    <div v-if="data.eventTypes.items[0]" class="post-block__category">
      {{ data.eventTypes.items[0].eventType.name }}
    </div>
    <h2 class="post-block__title">
      <nuxt-link :to="nestedSlug" append>{{ data.title }}</nuxt-link>
    </h2>
    <div class="post-meta">
      <div class="post-meta__block post-block__date">
        <span class="post-meta__label">Published</span>
        {{ formatDate }}
      </div>
      <div
        v-if="data.authors.items[0]"
        class="post-meta__block post-block__author"
      >
        <span class="post-meta__label">Written By</span>
        {{ data.authors.items[0].author.name }}
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
          slug: ''
        }
      }
    }
  },
  computed: {
    nestedSlug() {
      return `${this.data.slug}`
    },
    formatDate() {
      let formattedDate = this.data.postDate.replace('-', '/')
      let date = new Date(formattedDate)
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
