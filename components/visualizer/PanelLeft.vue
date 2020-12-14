<template>
  <TabWrapper v-model="activeTab" orientation="vertical">
    <TabList label="Controller">
      <button
        id="close-left-panel"
        class="btn btn--panel-close"
        @click="activeTab = ''"
      >
        <Icon id="chevron-left" class="icon" name="chevron-left" />
      </button>
      <TabActivator tab="filters">
        <Icon id="filter" class="icon" name="filter" />
      </TabActivator>
      <TabActivator tab="list">
        <Icon id="pin" class="icon" name="pin" />
      </TabActivator>
    </TabList>

    <TabPanel tab="filters" class="panel panel--left">
      <FilterTab />
    </TabPanel>
    <TabPanel tab="list" class="panel panel--left">
      The focus list goes here.
    </TabPanel>
  </TabWrapper>
</template>

<script>
import FilterTab from '~/components/visualizer/FilterTab'
import Icon from '~/components/global/Icon'
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'

export default {
  components: {
    FilterTab,
    Icon,
    TabActivator,
    TabList,
    TabPanel,
    TabWrapper
  },
  data() {
    return {
      activeTab: ''
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/panel';
</style>
