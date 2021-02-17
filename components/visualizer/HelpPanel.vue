<template>
  <tippy trigger="click" interactive @init="onTippyInit">
    <template v-slot:trigger>
      <button class="btn btn--controls btn--help">
        <Icon id="help" name="help" />
      </button>
    </template>

    <TabWrapper v-model="activeTab" scope="helpPanel">
      <Button class="btn btn--icon help__close" @click="closePanel">
        <Icon id="close-large" name="close-large" />
      </Button>
      <header>
        <TabList label="Controller" scope="helpPanel" class="help__buttons">
          <TabActivator
            tab="about"
            scope="helpPanel"
            class="help__tab-selector"
          >
            About the interface
          </TabActivator>
          <TabActivator tab="view" scope="helpPanel" class="help__tab-selector">
            Changing the view
          </TabActivator>
        </TabList>
      </header>

      <div class="help__panel-content">
        <TabPanel tab="about" scope="helpPanel">
          <dl>
            <div class="help__term">
              <dt class="help__title">Pan</dt>
              <dd class="help__icon-layout">
                <Icon id="pan-hand" name="pan-hand" /><span
                  class="help__icon-desc"
                  >Drag one finger</span
                >
              </dd>
              <dd class="help__icon-layout">
                <Icon id="pan-mouse" name="pan-mouse" /><span
                  class="help__icon-desc"
                  >Left click + drag</span
                >
              </dd>
            </div>
            <div class="help__term">
              <dt class="help__title help__title-line">Zoom</dt>
              <dd class="help__icon-layout">
                <Icon id="zoom-hand" name="zoom-hand" /><span
                  class="help__icon-desc"
                  >Pinch Fingers</span
                >
              </dd>
              <dd class="help__icon-layout">
                <Icon id="zoom-mouse" name="zoom-mouse" /><span
                  class="help__icon-desc"
                  >Right click + drag, or scroll</span
                >
              </dd>
            </div>
            <div class="help__term">
              <dt class="help__title help__title-line">Rotate</dt>
              <dd class="help__icon-layout">
                <Icon id="rotate-hand" name="rotate-hand" /><span
                  class="help__icon-desc"
                  >Drag fingers in different directions</span
                >
              </dd>
              <dd class="help__icon-layout">
                <Icon id="rotate-mouse" name="rotate-mouse" /><span
                  class="help__icon-desc"
                  >Middle click + drag or CTRL + Left/Right click + drag</span
                >
              </dd>
            </div>
            <div class="help__term">
              <dt class="help__title help__title-line">Tilt</dt>
              <dd class="help__icon-layout">
                <Icon id="tilt-hand" name="tilt-hand" /><span
                  class="help__icon-desc"
                  >Drag two fingers</span
                >
              </dd>
            </div>
          </dl>
        </TabPanel>
        <TabPanel tab="view" scope="helpPanel">
          Changing the view goes here.
        </TabPanel>
      </div>
    </TabWrapper>
  </tippy>
</template>

<script>
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'HelpPanel',
  components: {
    Icon,
    TabActivator,
    TabList,
    TabPanel,
    TabWrapper
  },
  data() {
    return {
      activeTab: 'about',
      tippyRef: null
    }
  },
  methods: {
    onTippyInit(el) {
      this.tippyRef = el
    },
    closePanel() {
      if (this.tippyRef) {
        this.tippyRef.hide()
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/help-panel';
</style>
