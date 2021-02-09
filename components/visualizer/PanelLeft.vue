<template>
  <div class="panel-left">
    <TabWrapper v-model="activeTab" scope="panelLeft" orientation="vertical">
      <TabList label="Controller" scope="panelLeft">
        <button
          id="close-left-panel"
          class="btn btn--panel-close"
          @click="activeTab = ''"
        >
          <Icon id="chevron-left" class="icon" name="chevron-left" />
        </button>
        <TabActivator tab="filters" scope="panelLeft">
          <Icon id="filter" class="icon" name="filter" />
          <div
            v-show="activeFiltersCount"
            class="badge badge--small badge--pinned"
          >
            {{ activeFiltersCount }}
          </div>
        </TabActivator>
        <TabActivator tab="list" scope="panelLeft">
          <Icon id="pin" class="icon" name="pin" />
          <div v-show="focusedSatellitesCount" class="badge badge--large">
            {{ focusedSatellitesCount }}
          </div>
        </TabActivator>
      </TabList>

      <TabPanel tab="filters" class="panel panel--left" scope="panelLeft">
        <FilterTab />
      </TabPanel>
      <TabPanel tab="list" class="panel panel--left" scope="panelLeft">
        <FocusList :is-open="activeTab === 'list'" />
      </TabPanel>
    </TabWrapper>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import FilterTab from '~/components/visualizer/FilterTab'
import FocusList from '~/components/visualizer/FocusList'
import Icon from '~/components/global/Icon'
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'

export default {
  components: {
    FilterTab,
    FocusList,
    Icon,
    TabActivator,
    TabList,
    TabPanel,
    TabWrapper
  },
  data() {
    return {
      activeTab: '',
      prevTab: ''
    }
  },
  computed: {
    ...mapState({
      filteredSatellites: (state) => state.satellites.filteredSatellites,
      focusedSatellites: (state) => state.satellites.focusedSatellites
    }),
    ...mapGetters({
      activeFiltersCount: 'filters/activeFiltersCount',
      focusedSatellitesCount: 'satellites/focusedSatellitesCount'
    })
  },
  watch: {
    activeTab(newTab, oldTab) {
      // console.log(newTab, oldTab)
      // console.log(this.activeTab, this.prevTab)

      // this.updateVisibleSatellitesType(newTab)

      // Switch Visible Objects based on active tab
      if (!newTab || newTab == this.prevTab) {
        console.log("don't change current visible")
        return
      }

      if (newTab) {
        this.prevTab = newTab
      }

      if (this.activeTab === 'filters' && this.activeFiltersCount > 0) {
        console.log('the filter list')
        this.updateVisibleSatellites(this.filteredSatellites)
      }

      if (this.activeTab === 'list' && this.focusedSatellitesCount > 0) {
        console.log('the focus list')
        this.updateVisibleSatellites([...this.focusedSatellites])
      }
    }
  },
  methods: {
    ...mapMutations({
      updateVisibleSatellites: 'satellites/updateVisibleSatellites',
      updateVisibleSatellitesType: 'satellites/updateVisibleSatellitesType'
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/panel';
@import '../assets/css/components/panel--left';
@import '../assets/css/components/badge';
</style>
