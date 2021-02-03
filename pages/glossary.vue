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
      found letters:
      {{ foundLetters }}
      <br />
      terms: {{ terms.sort() }}
      <br />
      terms by letter: {{ termsByLetter('t') }}
      <br />
      data formatted: {{ dataFormatted }}
      <br />
      all.apogee: {{ all.apogee }} <br />
      <section v-for="letter in foundLetters" :key="letter">
        <h2 :id="letter">{{ letter }}</h2>
        <dl>
          <!-- <div v-for="term in terms" :key="term.slug"> -->
          <div v-for="term in termsByLetter(letter)" :key="term.slug">
            <dt>{{ term }}</dt>
            <dd>
              Definition<br />
              Further Reading
            </dd>
          </div>
        </dl>
      </section>
    </section>
  </Page>
</template>

<script>
import { mapState } from 'vuex'

import Page from '~/layout/page'
export default {
  layout: 'layout',
  components: {
    Page
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
      let firstLetter = this.terms.map((term) => term.slice(0, 1))
      firstLetter = firstLetter
        .filter((a, b) => firstLetter.indexOf(a) === b)
        .sort()
      return firstLetter
    },
    dataFormatted() {
      const foundTerms = {}
      this.foundLetters.forEach((letter) => (foundTerms[letter] = []))
      // const foundTerms = {
      //   A: [{}, {}, {}],
      //   B: []
      // }

      //do some magic here to create the new dictionary.
      let helperFunction = this.glossary
      return foundTerms
    },
    terms() {
      return Object.keys(this.glossary)
    },
    all() {
      return this.glossary
    },
    ...mapState({
      glossary: (state) => state.glossary.glossary
    })
  },
  methods: {
    termsByLetter(letter) {
      let terms = this.terms.filter((term) => term.charAt(0) == letter)
      return terms
    },
    testMethod() {
      let testing = 1 + 10
      return testing
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
</style>
