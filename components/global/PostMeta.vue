<template>
  <dl class="post-meta">
    <div v-if="publishedDate">
      <dt class="post-meta__label">Published</dt>
      <dd>{{ publishedDate }}</dd>
    </div>
    <div v-if="lastUpdatedDate">
      <dt class="post-meta__label">Last Updated</dt>
      <dd>{{ lastUpdatedDate }}</dd>
    </div>
    <div v-if="authors">
      <dt class="post-meta__label">Written By</dt>
      <dd v-for="author in authors" :key="author.user_nicename">
        <a>{{ author.display_name }}</a>
      </dd>
    </div>
  </dl>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: null
    },
    modified: {
      type: String,
      default: null
    },
    authors: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    publishedDate() {
      if (!this.date) return
      return this.formatDate(this.date)
    },
    lastUpdatedDate() {
      if (!this.modified) return
      return this.formatDate(this.modified)
    }
  },
  methods: {
    formatDate(value) {
      let date = new Date(value)
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      return date.toLocaleDateString('en', options)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-meta';
</style>
