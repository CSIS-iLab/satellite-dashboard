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
      <section v-for="letter in foundLetters" :id="`${letter}`" :key="letter">
        <h2 :id="letter" class="alphabet-nav">{{ letter }}</h2>
        <dl>
          <div
            v-for="term in groupedTerms[letter]"
            :key="term"
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
      return Object.keys(this.groupedTerms).sort()
    },
    groupedTerms() {
      let groupedTerms = {}
      this.terms.forEach((term) => {
        let firstLetter = term.charAt(0).toUpperCase()
        if (!groupedTerms[firstLetter]) {
          groupedTerms[firstLetter] = []
        }

        groupedTerms[firstLetter].push(term)
      })
      return groupedTerms
    },
    terms() {
      return Object.keys(this.glossary).sort()
    },
    ...mapState({
      glossary: (state) => state.glossary.glossary
    })
  },
  methods: {
    termsByLetter(letter) {
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
