<template>
  <div>
    <h2 class="panel__title">Focus List</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <div>
      Hide unlisted objects<br />
      Hide object labels<br />
    </div>
    <div>
      <div v-if="isEditable">
        <Button :on-click="cancelEditing">
          <Icon id="close-small" name="close-small" />
        </Button>
        {{ numSelectedItems }} selected
        <Button :on-click="removeFromFocused">
          Remove
        </Button>
      </div>
      <div v-else>
        {{ focusedSatellitesCount }} objects saved<br />
        <Button class="btn--contained btn--icon" :on-click="editFocusList">
          <Icon id="pen" name="pen" />
        </Button>
      </div>
    </div>
    <ul class="sat-list" role="list">
      <li
        v-for="item in focusedItems"
        :key="item"
        class="sat__basic sat__basic--status"
        :data-status="satellites[item].meta.Status"
      >
        <div class="sat__name">
          {{ satellites[item].meta.Name }}
        </div>
        <div class="sat__id">{{ satellites[item].catalog_id }}</div>
        <div class="sat__actions">
          <Button v-if="!isEditable" :on-click="showSatelliteDetails">
            <Icon id="info" name="info" />
          </Button>
          <Checkbox
            v-if="isEditable"
            :id="item"
            v-model="selectedItems"
            :value="item"
            :label="`Remove ${satellites[item].meta.Name} from focus list.`"
            :hide-label="true"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import Button from '~/components/global/Button.vue'
import Checkbox from '~/components/global/Checkbox.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'FocusList',
  components: {
    Button,
    Checkbox,
    Icon
  },
  data() {
    return {
      isEditable: true,
      selectedItems: []
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
    ...mapGetters({
      focusedSatellites: 'satellites/focusedSatellites',
      focusedSatellitesCount: 'satellites/focusedSatellitesCount'
    })
  },
  methods: {
    editFocusList() {
      this.isEditable = true
    },
    cancelEditing() {
      this.isEditable = false
      this.selectedItems = []
    },
    removeFromFocused(e, catalog_id) {
      this.focusedItems.delete(catalog_id)
      this.updateFocusedSatellites(this.focusedItems)
    },
    showSatelliteDetails() {
      console.log('show details')
    },
    ...mapMutations({
      updateFocusedSatellites: 'satellites/updateFocusedSatellites'
    })
  }
}
</script>

<style lang="scss"></style>
