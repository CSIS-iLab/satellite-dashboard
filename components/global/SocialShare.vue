<template>
  <div>
    <div class="share">SHARE</div>
    <ul class="social-share">
      <li class="list-items">
        <a
          :href="facebookURL"
          rel="noopener"
          target="_blank"
          aria-label="Share on Facebook"
          ><Icon id="facebook" class="icon" name="facebook"
        /></a>
      </li>
      <li>
        <a
          id="twitter-link"
          :href="twitterURL"
          rel="nofollow"
          target="_blank"
          aria-label="Share on Twitter"
          ><Icon id="twitter" class="icon" name="twitter"
        /></a>
      </li>
      <!-- <li>
      <a
        id="linkedin-link"
        href="https://www.linkedin.com/shareArticle?mini=true&url={{ url }}&summary={{ pageTitle | escape }}&source=CSIS"
        rel="nofollow"
        target="_blank"
        aria-label="Share on LinkedIn"
        ><Icon id="linkedin" class="icon" name="linkedin"
      /></a>
    </li>
    <li>
      <a
        id="email-link"
        href="mailto:?subject={{ siteTitle | escape }}: {{ pageTitle | escape }}&amp;body={{ url }}"
        rel="nofollow"
        target="_blank"
        aria-label="Share by Email"
        ><Icon id="email" class="icon" name="email"
      /></a>
    </li>
    <li>
      <a id="link-link" aria-label="Share Link"
        ><Icon id="link" class="icon" name="link"
      /></a>
    </li> -->
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
  data: function() {
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
      console.log(this)
      return `https://twitter.com/intent/tweet?text=${this.pageTitle}&url=${this.siteURL}${this.$route.path}&via=CSIS&related=CSIS`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/social-share';
</style>
