<template>
  <!-- <Panel direction="left"> -->
  <TabWrapper v-model="activeTab" orientation="vertical">
    <TabList label="Controller">
      <button @click="activeTab = ''">Close all</button>
      <TabActivator tab="filters">Filters</TabActivator>
      <TabActivator tab="list">Focus List</TabActivator>
    </TabList>

    <TabPanel tab="filters" class="panel panel--left">
      Content for the filters goes here.
    </TabPanel>
    <TabPanel tab="list" class="panel panel--left">
      The focus list goes here.
    </TabPanel>
  </TabWrapper>
  <!-- </Panel> -->
</template>

<script>
import Panel from '~/components/visualizer/Panel'
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'

export default {
  components: {
    // Panel,
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
