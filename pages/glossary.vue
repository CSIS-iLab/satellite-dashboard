<template>
  <Page title="Glossary" :content-has-bg="true">
    <div slot="header">
      <ol role="list">
        <li v-for="letter in alphabet" :key="letter">
          <a :href="`#${letter}`">{{ letter }}</a>
        </li>
      </ol>
    </div>
    <section class="post__content entry-content">
      <section
        v-for="letter in foundLetters"
        :id="`${letter.toUpperCase()}`"
        :key="letter"
      >
        <h2 :id="letter">{{ letter }}</h2>
        <dl>
          <div v-for="term in termsByLetter(letter)" :key="term.slug">
            <dt class="layout-glossary__title">{{ glossary[term].title }}</dt>
            <dd class="layout-glossary__item">
              {{ glossary[term].short_definition }}
            </dd>
            <dt class="layout-glossary__further-reading">Further Reading:</dt>
            <dd class="layout-glossary__item">
              {{ glossary[term].short_definition }}
            </dd>
          </div>
        </dl>
        <a href="#top">
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
      // map & slice to get the first letter of each term. Then filter so we remove duplicates
      let firstLetter = this.terms.map((term) => term.charAt(0))
      firstLetter = firstLetter
        .filter((a, b) => firstLetter.indexOf(a) === b)
        .sort()
      return firstLetter
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
      return terms
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
</style>
