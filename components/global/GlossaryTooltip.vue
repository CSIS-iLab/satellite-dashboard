<template>
  <client-only>
    <tippy
      interactive
      placement="top"
      theme="dark tooltip"
      max-width="230px"
      arrow
    >
      <template v-slot:trigger>
        <button>
          <slot></slot>
        </button>
      </template>

      <h2 class="tooltip__term">{{ term.title }}</h2>
      <p class="tooltip__term-def">{{ term.short_definition }}</p>
      <a :href="termURL" class="tooltip__read-more">
        Read More
        <Icon id="chevron-right" name="chevron-right" />
      </a>
    </tippy>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'HelpPanel',
  components: {
    Icon
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    term() {
      return this.glossary[this.id]
    },
    termURL() {
      return `/glossary#${this.term.slug}`
    },
    ...mapState({
      glossary: (state) => state.glossary.glossary
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/tooltip';
</style>
