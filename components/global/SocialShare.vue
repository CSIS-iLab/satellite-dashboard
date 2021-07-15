<template>
  <div class="social-share">
    <div class="social-share__text">Share</div>
    <ul class="social-share__list" role="list">
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
        <client-only>
          <tippy to="copyURL" :visible="showCopySuccess" trigger="manual">
            Copied!
          </tippy>
        </client-only>
        <Button
          name="copyURL"
          class="btn--copy"
          aria-label="Copy link to current page"
          :on-click="copyURL"
        >
          <Icon id="link" class="icon" name="link" />
        </Button>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'SocialShare',
  components: { Button, Icon },
  props: {
    pageTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      siteTitle: 'Satellite Dashboard',
      showCopySuccess: false
    }
  },
  computed: {
    facebookURL() {
      return `https://www.facebook.com/sharer.php?u=${this.pageURL}`
    },
    twitterURL() {
      return `https://twitter.com/intent/tweet?text=${this.pageTitle}&url=${this.pageURL}&via=satdashboard&related=satdashboard`
    },
    linkedInURL() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${this.pageURL}&summary=${this.pageTitle}&source=CSIS`
    },
    emailURL() {
      return `mailto:?subject=${this.siteTitle}: ${this.pageTitle}&amp;body=${this.pageURL}`
    },
    pageURL() {
      return `${location.origin}${this.$route.path}`
    }
  },
  methods: {
    async copyURL() {
      try {
        await navigator.clipboard.writeText(this.pageURL)
        const that = this
        this.showCopySuccess = true

        setTimeout(function() {
          that.showCopySuccess = false
        }, 1000)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/social-share';
</style>
