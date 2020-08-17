<template>
  <div class="footer__learnMoreAbout" :class="parentClass">
    <p
      v-if="parentClass == 'footer__learnMoreAbout--footer'"
      :class="parentClass + '__title'"
    >
      Learn More About
    </p>
    <ul :class="parentClass + '__list'">
      <li
        v-for="item in items"
        :key="item.id"
        :class="[parentClass + '__' + item.id, parentClass + '__item']"
        class="footer__learnMoreAbout__item"
      >
        <nuxt-link :to="item.url">{{ item.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import json from 'static/navigation.json'
export default {
  name: 'LearnMoreAbout',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Center for Strategic and International Studies',
          url: '/',
          id: 'center-for-strategic-and-international-studies'
        },
        {
          title: 'Secure World Foundation',
          url: '/',
          id: 'secure-world-foundation'
        },
        {
          title: 'University of Texas at Austin',
          url: '/',
          id: 'universtiy-of-texas-at-austin'
        }
      ]
    }
  },
  computed: {
    parentClass() {
      return `footer__learnMoreAbout--${this.name}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/learn-more-about';
</style>
