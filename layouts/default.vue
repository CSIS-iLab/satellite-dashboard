<template>
  <div>
    <SiteLogo />
    <Header />
    <SocialShare page-title="Foobar" />
    <Button :on-click="onClick">Test Content</Button>
    <Button :on-click="onClick" class="btn--sm">Smol Button</Button>
    <Button :on-click="onClick" class="btn--contained">Contained Button</Button>
    <Button :on-click="onClick" class="btn--round">Round Button</Button>
    <Button :on-click="onClick" class="btn--outlined">Outlined Button</Button>
    <Button :on-click="onClick" class="btn--light">Light Button</Button>
    <Button :on-click="onClick" class="btn--icon">X</Button>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Header from '~/components/global/Header.vue'
import Footer from '~/components/global/Footer.vue'
import SocialShare from '~/components/global/SocialShare.vue'
import Button from '~/components/global/Button.vue'

export default {
  components: {
    Header,
    Footer,
    SiteLogo,
    SocialShare,
    Button
  },
  methods: {
    onClick() {
      console.log('Hello World')
    }
  }
}
</script>
