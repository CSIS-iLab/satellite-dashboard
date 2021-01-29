<template>
  <Page title="Analysis">
    <div slot="header">
      <p class="page__desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat ornare
        dictum ut arcu diam morbi mi rutrum aliquet. Varius molestie eros
        scelerisque convallis ornare sociis fusce mauris. Vitae ut etiam purus
        in mattis tristique feugiat tellus lacinia.
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
