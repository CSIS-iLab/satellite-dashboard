<template>
  <div class="social-share">
    <div class="social-share__text">SHARE</div>
    <ul class="social-share__list">
      <li class="social-share__item">
        <a
          :href="facebookURL"
          rel="nofollow"
          target="_blank"
          aria-label="Share on Facebook"
          ><Icon id="facebook" class="icon" name="facebook"
        /></a>
      </li>
      <li class="social-share__item">
        <a
          id="twitter-link"
          :href="twitterURL"
          rel="nofollow"
          target="_blank"
          aria-label="Share on Twitter"
          ><Icon id="twitter" class="icon" name="twitter"
        /></a>
      </li>
      <li class="social-share__item">
        <a
          :href="linkedInURL"
          rel="nofollow"
          target="_blank"
          aria-label="Share on LinkedIn"
          ><Icon id="linkedin" class="icon" name="linkedin"
        /></a>
      </li>
      <li class="social-share__item">
        <a
          :href="emailURL"
          rel="nofollow"
          target="_blank"
          aria-label="Share by Email"
          ><Icon id="email" class="icon" name="email"
        /></a>
      </li>
      <li class="social-share__item">
        <button
          id="copyText"
          :href="linkURL"
          aria-label="Share Link"
          @click.stop.prevent="copy"
        >
          <Icon id="link" class="icon" name="link" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'SocialShare',
  components: { Icon },
  props: {
    pageTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      siteURL: 'https://satellitedashboard.com',
      siteTitle: 'Satellite Dashboard'
    }
  },
  computed: {
    facebookURL() {
      return `https://www.facebook.com/sharer.php?u=${this.siteURL}${this.$route.path}`
    },
    twitterURL() {
      return `https://twitter.com/intent/tweet?text=${this.pageTitle}&url=${this.siteURL}${this.$route.path}&via=satdashboard&related=satdashboard`
    },
    linkedInURL() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${this.siteURL}&summary=${this.pageTitle}&source=CSIS`
    },
    emailURL() {
      return `mailto:?subject=${this.siteTitle}: ${this.pageTitle}&amp;body=${this.siteURL}`
    },
    linkURL() {
      return `${this.siteURL}`
    }
  }
  /*methods: {
    copy:
    function copy() {
      let copyText = document.querySelector('#copyText')

      copyText.setAttribute('type', 'text')
      copyText.select()

      try {
        var successful = document.execCommand('copy')
        var msg = successful ? 'successful' : 'unsuccessful'
        alert('Link copied!' + msg)
      } catch (err) {
        alert('Oops, unable to copy')
      }

      copyText.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }*/
}
</script>

<style lang="scss">
@import '../assets/css/components/social-share';
</style>
