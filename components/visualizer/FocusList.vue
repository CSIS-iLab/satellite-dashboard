<template>
  <div class="focus-list panel__content">
    <h2 class="panel__title">Focus List</h2>
    <p>
      Objects pinned to this list will appear in the visualization. Learn more
      about an object by clicking its information icon. Edit this list to remove
      an object.
    </p>
    <client-only>
      <tippy to="shareView" :visible="showShareViewSuccess" trigger="manual">
        Copied!
      </tippy>
    </client-only>
    <Button name="shareView" class="btn--share js--copy" :on-click="shareView">
      <Icon id="share" name="share" focusable="false" />
      Copy link to this view
    </Button>
    <ul class="focus-list__options" role="list">
      <li>
        <Toggle
          id="hide_object_labels"
          v-model="hideObjectLabels"
          label="Hide object labels"
        />
      </li>
    </ul>
    <div
      v-if="isEditable"
      class="focus-list__heading focus-list__heading--editing"
    >
      <Button :on-click="cancelEditing" aria-label="Cancel Editing">
        <Icon id="close-small" name="close-small" focusable="false" />
      </Button>
      <strong>{{ numSelectedItems }}</strong
      >&nbsp; selected
      <Button
        class="btn--sm btn--contained btn--contained-round btn--remove"
        :on-click="removeFromFocused"
      >
        Remove
      </Button>
    </div>
    <div v-else-if="focusedSatellitesCount > 0" class="focus-list__heading">
      <strong>{{ focusedSatellitesCount }} objects saved</strong>
      <Button
        class="btn--contained btn--icon btn--edit"
        aria-label="Edit Focus List"
        :on-click="editFocusList"
      >
        <Icon id="pen" name="pen" focusable="false" />
      </Button>
    </div>
    <ul class="sat-list" role="list">
      <li
        v-for="item in focusedItems"
        :key="item"
        class="sat__basic sat__basic--status"
        :data-status="satellites[item].Status"
        @click="(e) => showSatelliteDetails(e, item)"
      >
        <div class="sat__name">
          {{ satellites[item].Name }}
        </div>
        <div class="sat__id">{{ satellites[item].catalog_id }}</div>
        <div
          v-if="!orbits[item] || !orbits[item].orbits"
          class="sat__disclaimer"
        >
          *This object is not yet in orbit
        </div>
        <div class="sat__actions">
          <Button
            v-if="!isEditable"
            @click.stop="(e) => showSatelliteDetails(e, item)"
          >
            <Icon id="info" name="info" focusable="false" />
          </Button>
          <Checkbox
            v-if="isEditable"
            :id="item"
            v-model="selectedItems"
            :value="item"
            :label="`Remove ${satellites[item].Name} from focus list.`"
            :hide-label="true"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Button from '~/components/global/Button.vue'
import Checkbox from '~/components/global/Checkbox.vue'
import Icon from '~/components/global/Icon.vue'
import Toggle from '~/components/global/Toggle.vue'

export default {
  name: 'FocusList',
  components: {
    Button,
    Checkbox,
    Icon,
    Toggle
  },
  props: {
    isOpen: {
      type: Boolean
    }
  },
  data() {
    return {
      isEditable: false,
      selectedItems: [],
      hideUnlisted: false,
      hideObjectLabels: false,
      showShareViewSuccess: false
    }
  },
  computed: {
    focusedItems() {
      return new Set(this.focusedSatellites)
    },
    satellites() {
      return this.$store.state.satellites.satellites
    },
    orbits() {
      return this.$store.state.satellites.orbits
    },
    numSelectedItems() {
      return this.selectedItems.length
    },
    objectLabels() {
      return document.querySelector('.cesium__entity-label-container')
    },
    ...mapState({
      focusedSatellites: (state) => state.satellites.focusedSatellites,
      selectedTimescale: (state) => state.satellites.selectedTimescale,
      targetDate: (state) => state.satellites.targetDate
    }),
    ...mapGetters({
      focusedSatellitesCount: 'satellites/focusedSatellitesCount'
    })
  },
  watch: {
    hideObjectLabels: function(val) {
      this.objectLabels.classList.toggle('is-hidden', val)
    },
    focusedItems: function(val, oldVal) {
      const visibleSatellites =
        this.focusedSatellites.size > 0
          ? [...this.focusedSatellites]
          : Object.keys(this.$store.state.satellites.satellites)
      this.updateVisibleSatellites(visibleSatellites)
    },
    '$route.query.satids': 'handleQueryString'
  },
  mounted() {
    this.handleQueryString()
  },
  methods: {
    editFocusList() {
      this.isEditable = true
    },
    cancelEditing() {
      this.isEditable = false
      this.selectedItems = []
    },
    handleQueryString() {
      const satIds = this.$route.query.satids
        ? new Set(this.$route.query.satids.split(','))
        : new Set([])
      this.updateFocusedSatellites(satIds)
    },
    removeFromFocused() {
      let newFocusedItems = new Set(this.focusedSatellites)

      for (let i = 0; i < this.selectedItems.length; i++) {
        const item = this.selectedItems[i]
        newFocusedItems.delete(item)
      }

      this.updateFocusedSatellites(newFocusedItems)
      this.cancelEditing()
    },
    showSatelliteDetails(e, catalog_id) {
      console.log('show details')
      this.updateDetailedSatellite(catalog_id)
    },
    async shareView() {
      let viewParams = new URLSearchParams()

      const satellites = Array.from(this.focusedSatellites).join(',')
      viewParams.set('satids', satellites)

      const date = new Date(this.targetDate)
      const formattedDate = [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
      ].join('-')

      viewParams.set('date', formattedDate)

      const timescale = this.selectedTimescale.id
      viewParams.set('timescale', timescale)

      const url = `${location.href}?${viewParams.toString()}`

      try {
        await navigator.clipboard.writeText(url)
        const that = this
        this.showShareViewSuccess = true

        setTimeout(function() {
          that.showShareViewSuccess = false
        }, 1000)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    },
    ...mapMutations({
      updateFocusedSatellites: 'satellites/updateFocusedSatellites',
      updateDetailedSatellite: 'satellites/updateDetailedSatellite',
      updateVisibleSatellites: 'satellites/updateVisibleSatellites'
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/focus-list';
</style>
