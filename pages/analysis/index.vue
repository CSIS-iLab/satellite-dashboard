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
    <PostBlock v-for="post in posts" :key="post.title" :data="post" />
  </Page>
</template>

<script>
import Page from '~/layout/page'
import Posts from '~/content/data/analysis.json'
import PostBlock from '~/components/global/PostBlock.vue'

export default {
  layout: 'layout',
  components: {
    Page,
    PostBlock
  },
  computed: {
    posts() {
      return Posts
    }
  }
}
</script>

<style lang="scss">
.page__desc {
  max-width: $size__content-max-width;
  margin-right: auto;
  margin-left: auto;
  color: $color-white-180;
  @extend %font-ui-text-lg-oxygen;
}
</style>
