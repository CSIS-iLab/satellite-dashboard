<template>
  <div class="panel panel--right details-panel">
    <TabWrapper v-model="activeTab" scope="detailsPanel">
      <header class="details-panel__header">
        <div class="details-panel__controls">
          <Button class="btn--icon btn--zoom" :on-click="zoomIn">
            <Icon id="target" name="target" />
          </Button>
          <Button class="btn--icon btn--pin" :on-click="toggleFocusState">
            <Icon id="pin" name="pin" />
          </Button>
          <Button class="btn--icon btn--close" :on-click="closePanel">
            <Icon id="close-large" name="close-large" />
          </Button>
        </div>
        <h2 class="panel__title">Satellite Name</h2>
        <TabList label="Controller" scope="detailsPanel">
          <TabActivator tab="details" scope="detailsPanel">
            Details
          </TabActivator>
          <TabActivator tab="events" scope="detailsPanel">
            Key Events
          </TabActivator>
          <TabActivator tab="analysis" scope="detailsPanel">
            Analysis
          </TabActivator>
        </TabList>
      </header>

      <div class="details-panel__content">
        <TabPanel tab="details" scope="detailsPanel">
          <Details />
        </TabPanel>
        <TabPanel tab="events" scope="detailsPanel">
          Events goes here!
        </TabPanel>
        <TabPanel tab="analysis" scope="detailsPanel">
          Analysis goes here!
        </TabPanel>
      </div>
    </TabWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '~/components/global/Button'
import Details from '~/components/visualizer/details-panel/Details.vue'
import Icon from '~/components/global/Icon'
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'

export default {
  components: {
    Button,
    Details,
    Icon,
    TabActivator,
    TabList,
    TabPanel,
    TabWrapper
  },
  data() {
    return {
      activeTab: 'details'
    }
  },
  methods: {
    zoomIn() {
      console.log('zoom in on this object')
    },
    toggleFocusState() {
      console.log('toggle focus state')
    },
    closePanel() {
      console.log('close panel')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/panel';
@import '../assets/css/components/details-panel';
@import '../assets/css/components/badge';
</style>
