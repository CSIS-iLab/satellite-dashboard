<template>
  <ul class="social-share">
    <div class="share">SHARE</div>
    <li class="list-items">
      <a
        id="facebook-link"
        href=""
        rel="nofollow"
        target="_blank"
        aria-label="Share on Facebook"
        ><Icon id="facebook" class="icon" name="facebook"
      /></a>
    </li>
    <li>
      <a
        id="twitter-link"
        href=""
        rel="nofollow"
        target="_blank"
        aria-label="Share on Twitter"
        ><Icon id="twitter" class="icon" name="twitter"
      /></a>
    </li>
    <li>
      <a
        id="linkedin-link"
        href=""
        rel="nofollow"
        target="_blank"
        aria-label="Share on LinkedIn"
        ><Icon id="linkedin" class="icon" name="linkedin"
      /></a>
    </li>
    <li>
      <a
        id="email-link"
        href=""
        rel="nofollow"
        target="_blank"
        aria-label="Share by Email"
        ><Icon id="email" class="icon" name="email"
      /></a>
    </li>
    <li>
      <a
        id="link-link"
        href=""
        rel="nofollow"
        target="_blank"
        aria-label="Share Link"
        ><Icon id="link" class="icon" name="link"
      /></a>
    </li>
  </ul>
</template>

<script>
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'SocialShare',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/social-share';
</style>
