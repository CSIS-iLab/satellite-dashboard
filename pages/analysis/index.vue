<template>
  <Page title="Analysis">
    <div slot="header">
      <p class="page__desc">
        The following analysis pieces were authored by the Dashboard's analysis
        team to provide a more detailed summary of an event, including the
        objects involved, the timeframe, and its signifcance for international
        space security.
      </p>
    </div>
    <PostList :posts="posts" size="wide" :is-compact="false" />
  </Page>
</template>

<script>
import Page from '~/layout/page'
import PostList from '~/components/global/PostList.vue'

export default {
  layout: 'layout',
  components: {
    Page,
    PostList
  },
  computed: {
    posts() {
      return this.$store.state.analysis.posts
    }
  }
  // created() {
  //   this.$store.dispatch('analysis/getPosts')
  // }
}
</script>

<style lang="scss">
@import '../assets/css/pages/analysis';
</style>
