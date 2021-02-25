<template>
  <div class="panel panel--right updates-panel">
    <Button
      class="btn--contained btn--curved btn--updates-panel"
      :on-click="openPanel"
    >
      <Icon id="lightning" name="lightning" />
      Latest Updates
    </Button>
    <TabWrapper v-show="panelIsOpen" v-model="activeTab" scope="latestUpdates">
      <header class="updates-panel__header">
        <Button class="btn--close" :on-click="closePanel">
          <Icon id="close-large" name="close-large" />
          Close
        </Button>
        <h2 class="panel__title">Latest Updates</h2>
        <TabList label="Controller" scope="latestUpdates">
          <TabActivator tab="events" scope="latestUpdates">
            Key Events
          </TabActivator>
          <TabActivator tab="analysis" scope="latestUpdates">
            Analysis
          </TabActivator>
        </TabList>
      </header>

      <div class="updates-panel__content">
        <TabPanel tab="events" scope="latestUpdates">
          <p>
            Learn more about the latest instances of unsual satellite behavior.
            Select an event for more details.
          </p>
          <nuxt-link to="/key-events" class="updates-panel__page-link">
            All Key Events
            <Icon id="chevron-right" name="chevron-right" />
          </nuxt-link>
          <!-- <Events :id="id" :name="satelliteName" /> -->
        </TabPanel>
        <TabPanel tab="analysis" scope="latestUpdates">
          <p>
            Learn more about particularly interesting on-orbit events with
            articles from the Satellite Dashboard analysis team.
          </p>
          <nuxt-link to="/analysis" class="updates-panel__page-link">
            All Analysis
            <Icon id="chevron-right" name="chevron-right" />
          </nuxt-link>
          <PostList :posts="latestPosts" />
        </TabPanel>
      </div>
    </TabWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '~/components/global/Button'
import Icon from '~/components/global/Icon'
import PostList from '~/components/global/PostList.vue'
import { TabActivator, TabList, TabPanel, TabWrapper } from '@a11y-kit/vue-tabs'

export default {
  components: {
    Button,
    Icon,
    PostList,
    TabActivator,
    TabList,
    TabPanel,
    TabWrapper
  },
  data() {
    return {
      activeTab: 'events',
      panelIsOpen: false
    }
  },
  computed: {
    ...mapGetters({
      latestPosts: 'analysis/latestPosts'
    })
  },
  methods: {
    openPanel() {
      this.panelIsOpen = true
    },
    closePanel() {
      this.panelIsOpen = false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/panel';
@import '../assets/css/components/updates-panel';
</style>
