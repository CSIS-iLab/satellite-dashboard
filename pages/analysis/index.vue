<template>
  <div>
    <PostBlock v-for="post in posts" :key="post.title" :data="post" />
  </div>
</template>

<script>
import Posts from '~/content/analysis.json'
import PostBlock from '~/components/global/PostBlock.vue'

export default {
  layout: 'layout',
  components: {
    PostBlock
  },
  computed: {
    posts() {
      return Posts
    }
  }
}
</script>
