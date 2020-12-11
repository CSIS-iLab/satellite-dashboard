<template>
  <TabWrapper v-model="activeTab" orientation="vertical">
    <TabList label="Controller">
      <button @click="activeTab = ''">Close all</button>
      <TabActivator tab="filters">Filters</TabActivator>
      <TabActivator tab="list">Focus List</TabActivator>
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
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'

export default {
  components: {
    FilterTab,
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
