<template>
  <ul
    class="post-list"
    :class="{ 'post-list--compact': isCompact, 'post-list--full': !isCompact }"
    role="list"
  >
    <li v-for="post in posts" :key="post.id">
      <PostBlock
        :post="post"
        :class="{ 'post-component--wide': size == 'wide' }"
      />
    </li>
  </ul>
</template>

<script>
import PostBlock from '~/components/global/PostBlock.vue'

export default {
  components: {
    PostBlock
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    isCompact: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/components/post-block';
</style>
