<template>
  <TabWrapper
    v-model="activeTab"
    scope="detailsPanel"
    class="panel panel--right details-panel"
  >
    <header class="details-panel__header">
      <div class="details-panel__controls">
        <Button
          class="btn--icon btn--zoom"
          aria-label="Zoom Into Sattelite"
          :class="{ 'btn--is-focused': isSatelliteTracked }"
          :on-click="trackObject"
          :disabled="!hasOrbit"
        >
          <Icon id="target" name="target" focusable="false" />
        </Button>
        <Button
          class="btn--icon btn--pin"
          aria-label="Pin Sattelite"
          :aria-pressed="satelliteIsInFocused"
          :on-click="toggleFocusState"
        >
          <Icon
            v-show="satelliteIsInFocused"
            id="pin"
            name="pin"
            focusable="false"
          />
          <Icon
            v-show="!satelliteIsInFocused"
            id="unpin"
            name="unpin"
            focusable="false"
          />
        </Button>
        <Button
          class="btn--icon btn--close"
          aria-label="Close Panel"
          :on-click="closePanel"
        >
          <Icon id="close-large" name="close-large" focusable="false" />
        </Button>
      </div>
      <h2 class="panel__title">{{ satelliteName }}</h2>
      <TabList label="Controller" scope="detailsPanel">
        <TabActivator
          tab="details"
          scope="detailsPanel"
          class="tab--horizontal"
        >
          Details
        </TabActivator>
        <TabActivator tab="events" scope="detailsPanel" class="tab--horizontal">
          Key Events
        </TabActivator>
        <TabActivator
          tab="analysis"
          scope="detailsPanel"
          class="tab--horizontal"
        >
          Analysis
        </TabActivator>
      </TabList>
    </header>

    <div class="scroller details-panel__content">
      <TabPanel tab="details" scope="detailsPanel">
        <Details :id="id" :satellite="satellite" />
      </TabPanel>
      <TabPanel tab="events" scope="detailsPanel">
        <Events :id="id" :name="satelliteName" />
      </TabPanel>
      <TabPanel tab="analysis" scope="detailsPanel">
        <Analysis :id="id" />
      </TabPanel>
    </div>
  </TabWrapper>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Button from '~/components/global/Button'
import Details from '~/components/visualizer/details-panel/Details.vue'
import Events from '~/components/visualizer/details-panel/Events.vue'
import Analysis from '~/components/visualizer/details-panel/Analysis.vue'
import Icon from '~/components/global/Icon'
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'

import cesiumServiceProvider from '~/services/cesium-service'
const cesiumService = cesiumServiceProvider()
let cesium

export default {
  components: {
    Analysis,
    Button,
    Details,
    Events,
    Icon,
    TabActivator,
    TabList,
    TabPanel,
    TabWrapper
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    satellite: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      activeTab: 'details',
      isTracked: true
    }
  },
  computed: {
    satelliteName() {
      return this.satellite.Name
    },
    satelliteIsInFocused() {
      return this.focusedSatellites.has(this.id)
    },
    isSatelliteTracked() {
      return this.isTracked
    },
    hasOrbit() {
      if (!this.satelliteAllOrbits || !this.satelliteAllOrbits.length) {
        return false
      }

      return true
    },
    satelliteAllOrbits() {
      if (!this.orbits[this.id]) {
        return []
      }
      return this.orbits[this.id].orbits
    },
    ...mapState({
      focusedSatellites: (state) => state.satellites.focusedSatellites,
      orbits: (state) => state.satellites.orbits
    })
  },
  watch: {
    id() {
      // If we're updating to a new satellite, update the tracked state.
      this.isTracked = true
    }
  },
  mounted() {
    cesiumService.getInstance().then((cesiumInstance) => {
      cesium = cesiumInstance
    })
  },
  methods: {
    trackObject() {
      const { viewer } = cesium
      const entity = viewer.entities.getById(this.id)

      if (!entity) {
        return
      }

      if (viewer.selectedEntity == entity) {
        //viewer.trackedEntity = null
        viewer.selectedEntity = false
        this.isTracked = false
        return
      }
      viewer.trackedEntity = entity
      viewer.selectedEntity = entity
      this.isTracked = true
    },
    toggleFocusState() {
      let newFocusedItems = new Set(this.focusedSatellites)

      if (this.satelliteIsInFocused) {
        newFocusedItems.delete(this.id)
      } else {
        newFocusedItems.add(this.id)
      }

      return this.updateFocusedSatellites(newFocusedItems)
    },
    closePanel() {
      this.updateDetailedSatellite(null)
    },
    ...mapMutations({
      updateFocusedSatellites: 'satellites/updateFocusedSatellites',
      updateDetailedSatellite: 'satellites/updateDetailedSatellite'
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/panel';
@import '../assets/css/components/tabs';
@import '../assets/css/components/details-panel';
@import '../assets/css/components/badge';
</style>
