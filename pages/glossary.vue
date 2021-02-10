<template>
  <Page title="Glossary" :content-has-bg="true">
    <div slot="header">
      <ol role="list">
        <li v-for="letter in alphabet" :key="letter">
          <template v-if="foundLetters.includes(letter)">
            <a :href="`#${letter}`" :aria-label="`Jump to ${letter} words`">
              {{ letter }}
            </a>
          </template>
          <template v-else>{{ letter }}</template>
        </li>
      </ol>
    </div>
    <section class="post__content entry-content">
      <section
        v-for="letter in foundLetters"
        :id="`${letter.toUpperCase()}`"
        :key="letter"
      >
        <h2 :id="letter" class="found-letters">{{ letter }}</h2>
        <dl>
          <div
            v-for="term in termsByLetter(letter.toLowerCase())"
            :key="term.slug"
            class="glossary"
          >
            <dt class="glossary__title">{{ glossary[term].title }}</dt>
            <dd class="glossary__item">
              {{ glossary[term].short_definition }}
              <div class="glossary__further-reading">
                Further Reading
              </div>
              Further reading content here.
            </dd>
          </div>
        </dl>
        <a href="#top" class="back-top">
          <Icon id="arrow-up" class="icon" name="arrow-up" />
          Back to Top
        </a>
        <!-- <hr class="end-section" /> -->
      </section>
    </section>
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '~/components/global/Icon.vue'
import Page from '~/layout/page'
export default {
  layout: 'layout',
  components: {
    Page,
    Icon
  },
  data() {
    return {
      alphabet: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
    }
  },
  computed: {
    foundLetters() {
      return [
        ...new Set(this.terms.map((term) => term.charAt(0).toUpperCase())) // I capitalized this so `foundLetters` is all caps.
      ].sort()
    },
    terms() {
      return Object.keys(this.glossary)
    },
    ...mapState({
      glossary: (state) => state.glossary.glossary
    })
  },
  methods: {
    termsByLetter(letter) {
      let terms = this.terms.filter((term) => term.charAt(0) == letter)
      // return terms
      return [...this.terms.filter((term) => term.charAt(0) == letter)]
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/glossary';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
</style>
