<template>
  <ul class="social-share">
    <div class="share">SHARE</div>
    <li class="list-items">
      <a
        id="facebook-link"
        href="https://www.facebook.com/sharer.php?u={{ url }}"
        rel="nofollow"
        target="_blank"
        aria-label="Share on Facebook"
        ><Icon id="facebook" class="icon" name="facebook"
      /></a>
    </li>
    <li>
      <a
        id="twitter-link"
        href="https://twitter.com/intent/tweet?text={{ pageTitle | escape }}&url={{ url }}&via=CSIS&related=CSIS"
        rel="nofollow"
        target="_blank"
        aria-label="Share on Twitter"
        ><Icon id="twitter" class="icon" name="twitter"
      /></a>
    </li>
    <li>
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
    </li>
  </ul>
</template>

<script>
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'SocialShare',
  components: { Icon },
  props: {
    data: {
      type: Object,
      default() {
        return {
          url: 'https://twitter.com',
          pageTitle: 'Satellite Page',
          siteTitle: 'Satellite Dashboard'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/social-share';
</style>
