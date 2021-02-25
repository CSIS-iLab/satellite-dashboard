<template>
  <article class="post-component post-block">
    <PostCategories :categories="categoriesList" />
    <h2 class="post-block__title">
      <nuxt-link :to="nestedSlug" append>{{ post.title.rendered }}</nuxt-link>
    </h2>
    <PostMeta :date="post.date" :authors="post.authors" />
    <!-- eslint-disable-next-line -->
    <div class="post-block__excerpt" v-html="post.excerpt.rendered"></div>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import PostCategories from '~/components/global/PostCategories.vue'
import PostMeta from '~/components/global/PostMeta.vue'

export default {
  components: {
    PostCategories,
    PostMeta
  },
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    nestedSlug() {
      return `${this.post.slug}`
    },
    formatDate() {
      let date = new Date(this.post.date)
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      return date.toLocaleDateString('en', options)
    },
    categoriesList() {
      if (!this.post.categories) {
        return []
      }

      const keywords = this.post.categories.map((d) => ({
        value: d,
        label: this.categories.find((t) => t.id === d)?.name.trim()
      }))

      return keywords
    },
    ...mapState({
      categories: (state) => state.analysis.categories
    })
  }
}
</script>
