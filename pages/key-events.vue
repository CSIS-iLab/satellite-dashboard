<template>
  <Page title="Key Events" :content-has-bg="false">
    <div slot="header">
      <p class="page__desc">
        Key Events are automatically highilighted activities that are unique and
        likely to be of particular interest. Currently, this list only includes
        rendezvous and proximity operation activities in the geosynchronous
        region.
      </p>
      <p class="page__desc">
        The event summaries shown here are a function of the underlying data,
        which may be missing, incomplete, or have significant uncertainty. Learn
        more about the Dashboard's methodology here.
      </p>
    </div>
    <!-- eslint-disable-->
    <section class="post__content entry-content">
      <p>Coming soon.</p>
    </section>
    <!-- eslint-enable -->
  </Page>
</template>

<script>
import Page from '~/layout/page'

export default {
  layout: 'layout',
  components: {
    Page
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
</style>
