<template>
  <div>
    <SiteLogo />
    Site Header
    <SocialShare page-title="Foobar" />
    <Button :on-click="onClick">Test Content</Button>
    <Button :on-click="onClick" class="btn--sm">Smol Button</Button>
    <Button :on-click="onClick" class="btn--contained">Contained Button</Button>
    <Button :on-click="onClick" class="btn--round">Round Button</Button>
    <Button :on-click="onClick" class="btn--outlined">Outlined Button</Button>
    <Button :on-click="onClick" class="btn--light">Light Button</Button>
    <Button :on-click="onClick" class="btn--icon">X</Button>
    <nuxt />
    <TextInput
      id="test"
      name="test"
      placeholder="Placeholder text"
      label-text="Label for Test"
    />
    <Footer />
  </div>
</template>

<script>
import SiteLogo from '~/components/global/SiteLogo.vue'
import Footer from '~/components/global/Footer.vue'
import SocialShare from '~/components/global/SocialShare.vue'
import TextInput from '~/components/global/TextInput.vue'
import Button from '~/components/global/Button.vue'

export default {
  components: {
    Footer,
    SiteLogo,
    SocialShare,
    TextInput,
    Button
  },
  methods: {
    onClick() {
      console.log('Hello World')
    }
  }
}
</script>
