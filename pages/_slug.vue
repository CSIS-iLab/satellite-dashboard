<template>
  <Page v-if="page" :title="page.title.rendered" :content-has-bg="true">
    <!-- eslint-disable-->
    <section
      class="post__content entry-content"
      v-html="page.content.rendered"
    ></section>
    <!-- eslint-enable -->
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import Page from '~/layout/page'

export default {
  layout: 'layout',
  components: {
    Page
  },
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  computed: {
    page() {
      return this.pages.find((el) => el.slug === this.slug)
    },
    ...mapState({
      pages: (state) => state.pages.pages
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
</style>
