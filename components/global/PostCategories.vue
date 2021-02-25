<template>
  <ul v-if="categories" class="post__category">
    <li v-for="cat in categories" :key="cat.id">
      <nuxt-link :to="`/analysis/?categories=${cat.value}`">{{
        cat.label
      }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  }
}
</script>
