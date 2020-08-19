<template>
  <article class="post-component post-component--wide post-block">
    <!-- <div v-if="data.eventTypes.items[0]" class="post-block__category">
      {{ data.eventTypes.items[0].eventType.name }}
    </div> -->
    <h2 class="post-block__title">
      <nuxt-link :to="nestedSlug" append>{{ data.title.rendered }}</nuxt-link>
    </h2>
    <PostMeta :date="data.date" :authors="data.authors" />
    <!-- eslint-disable-next-line -->
    <div class="post-block__excerpt" v-html="data.excerpt.rendered"></div>
  </article>
</template>

<script>
import PostMeta from '~/components/global/PostMeta.vue'

export default {
  components: {
    PostMeta
  },
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
      let date = new Date(this.data.date)
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
