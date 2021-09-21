<template>
  <div class="details-analysis">
    <p v-if="!hasRelatedPosts" class="details-panel__desc">
      This object does not appear in any Dashboard analysis pieces.
      <nuxt-link to="/analysis" class="updates-panel__page-link">
        All Analysis
        <Icon id="chevron-right" name="chevron-right" />
      </nuxt-link>
    </p>
    <PostList :posts="relatedPosts" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '~/components/global/Icon'
import PostList from '~/components/global/PostList.vue'

export default {
  components: {
    PostList,
    Icon
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      activeTab: 'analysis'
    }
  },
  computed: {
    relatedPosts() {
      let posts = this.posts.filter((post) => {
        if (!Array.isArray(post.acf.related_satellites)) {
          return false
        }

        if (
          post.acf.related_satellites.some(
            (sat) => sat.acf.catalog_id === this.id
          )
        ) {
          return true
        }
      })
      return posts
    },
    hasRelatedPosts() {
      return this.relatedPosts.length > 0 ? true : false
    },
    ...mapState({
      posts: (state) => state.analysis.posts
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/updates-panel';
</style>
