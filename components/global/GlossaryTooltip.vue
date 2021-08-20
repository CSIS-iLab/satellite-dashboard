<template>
  <div class="tooltip__container">
    <client-only v-if="term">
      <tippy
        interactive
        theme="dark tooltip"
        max-width="230px"
        interactive-border="4"
        distance="12"
        arrow
        follow-cursor="true"
      >
        <template v-slot:trigger>
          <button
            class="tooltip__trigger"
            :class="{ 'tooltip__trigger--text': !showInfo }"
          >
            <slot></slot>
            <Icon v-if="showInfo" id="info" name="info" />
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
    <template v-else>
      <slot></slot>
    </template>
  </div>
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
    },
    showInfo: {
      type: Boolean,
      required: false,
      default: false
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
