<template>
  <div class="focus-list panel__content">
    <h2 class="panel__title">Focus List</h2>
    <p>
      Objects pinned to this list will appear in the visualization. Learn more
      about an object by clicking its information icon. Edit this list to remove
      an object.
    </p>
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
      <Button :on-click="cancelEditing">
        <Icon id="close-small" name="close-small" />
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
    <div v-else class="focus-list__heading">
      <strong>{{ focusedSatellitesCount }} objects saved</strong>
      <Button
        class="btn--contained btn--icon btn--edit"
        :on-click="editFocusList"
      >
        <Icon id="pen" name="pen" />
      </Button>
    </div>
    <ul class="sat-list" role="list">
      <li
        v-for="item in focusedItems"
        :key="item"
        class="sat__basic sat__basic--status"
        :data-status="satellites[item].Status"
      >
        <div class="sat__name">
          {{ satellites[item].Name }}
        </div>
        <div class="sat__id">{{ satellites[item].catalog_id }}</div>
        <div class="sat__actions">
          <Button
            v-if="!isEditable"
            :on-click="(e) => showSatelliteDetails(e, item)"
          >
            <Icon id="info" name="info" />
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
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
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
      hideObjectLabels: false
    }
  },
  computed: {
    focusedItems() {
      return new Set(this.focusedSatellites)
    },
    satellites() {
      return this.$store.state.satellites.satellites
    },
    numSelectedItems() {
      return this.selectedItems.length
    },
    ...mapState({
      focusedSatellites: (state) => state.satellites.focusedSatellites
    }),
    ...mapGetters({
      focusedSatellitesCount: 'satellites/focusedSatellitesCount'
    })
  },
  watch: {
    hideObjectLabels: function(val, oldVal) {
      if (val) {
        console.log('hide anything not in the focus list')
        return
      }

      console.log('show everything')
    },
    focusedItems: function(val, oldVal) {
      if (this.isOpen) {
        this.updateVisibleSatellites([...this.focusedSatellites])
      }
    }
  },
  methods: {
    editFocusList() {
      this.isEditable = true
    },
    cancelEditing() {
      this.isEditable = false
      this.selectedItems = []
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
