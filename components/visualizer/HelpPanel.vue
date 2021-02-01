<template>
  <tippy trigger="click" interactive>
    <template v-slot:trigger>
      <button class="btn btn--controls btn--help">
        <Icon id="help" name="help" />
      </button>
    </template>

    <TabWrapper v-model="activeTab" scope="helpPanel">
      <header class="help-panel__header">
        <TabList label="Controller" scope="helpPanel">
          <TabActivator tab="about" scope="helpPanel">
            About the interface
          </TabActivator>
          <TabActivator tab="view" scope="helpPanel">
            Changing the view
          </TabActivator>
        </TabList>
      </header>

      <div class="help-panel__content">
        <TabPanel tab="about" scope="helpPanel">
          <h4 class="help-title">Pan</h4>
          <div class="help-layout">
            <div class="help-icon-layout">
              <Icon id="pan-hand" name="pan-hand" />
              <span class="help-icon-desc">
                Drag one finger
              </span>
            </div>
            <div class="help-icon-layout">
              <Icon id="pan-mouse" name="pan-mouse" />
              <span class="help-icon-desc">
                Left click + drag
              </span>
            </div>
          </div>

          <h4 class="help-title help-title-line">Zoom</h4>
          <div class="help-layout">
            <div class="help-icon-layout">
              <Icon id="zoom-hand" name="zoom-hand" />
              <span class="help-icon-desc">
                Pinch fingers
              </span>
            </div>
            <div class="help-icon-layout">
              <Icon id="zoom-mouse" name="zoom-mouse" />
              <span class="help-icon-desc">
                Right click + drag, or scroll
              </span>
            </div>
          </div>

          <h4 class="help-title help-title-line">Rotate</h4>
          <div class="help-layout">
            <div class="help-icon-layout">
              <Icon id="rotate-hand" name="rotate-hand" />
              <span class="help-icon-desc">
                Drag fingers in different directions
              </span>
            </div>
            <div class="help-icon-layout">
              <Icon id="rotate-mouse" name="rotate-mouse" />
              <span class="help-icon-desc">
                Middle click + drag or CTRL + Left/Right click + drag
              </span>
            </div>
          </div>

          <h4 class="help-title help-title-line">Tilt</h4>
          <div class="help-layout">
            <div class="help-icon-layout">
              <Icon id="tilt-hand" name="tilt-hand" />
              <span class="help-icon-desc">
                Drag two fingers
              </span>
            </div>
          </div>
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
import { tippy } from 'vue-tippy'
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
      activeTab: 'about'
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/help-panel';
</style>
