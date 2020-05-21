<template>
  <article class="post container">
    <header class="post__header">
      <h1>{{ title }}</h1>
      {{ excerpt }}
      <h2>Author: {{ authors.items[0].author.name }}</h2>
    </header>
    <!-- eslint-disable-next-line -->
    <section class="post__content" v-html="content"></section>
  </article>
</template>
<script>
import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '@/src/graphql/queries'

export default {
  async asyncData({ params }) {
    try {
      const data = await API.graphql(
        graphqlOperation(queries.postsBySlug, { slug: params.slug })
      )
      /*
        because of API requirements around key and unique value, we get a list
        back, but we can be pretty sure it will be the only item, so grab 0 index
        otherwise, on failure, this is a bad slug
      */
      return data.data.postsBySlug.items[0]
    } catch (error) {
      return false
    }
  },
  head() {
    return {
      title: this.title,
      bodyAttrs: {
        class: 'page-layout'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/post';
</style>
