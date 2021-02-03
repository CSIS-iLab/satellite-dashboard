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
    <PostBlock v-for="post in posts" :key="post.id" :data="post" />
  </Page>
</template>

<script>
import Page from '~/layout/page'
import PostBlock from '~/components/global/PostBlock.vue'

export default {
  layout: 'layout',
  components: {
    Page,
    PostBlock
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
