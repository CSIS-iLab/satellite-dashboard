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
          About the interface content here.<br />
          <Icon id="tilt-hand2" name="tilt-hand2" />
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

<style lang="scss"></style>
