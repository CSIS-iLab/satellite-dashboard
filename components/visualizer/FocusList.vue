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
      {{ focusedSatellitesCount }} objects saved<br />
      Edit button
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
          <Button :on-click="showSatelliteDetails">
            <Icon id="info" name="info" />
          </Button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'FocusList',
  components: {
    Button,
    Icon
  },
  computed: {
    focusedItems() {
      return new Set(this.focusedSatellites)
    },
    satellites() {
      return this.$store.state.satellites.satellites
    },
    ...mapGetters({
      focusedSatellites: 'satellites/focusedSatellites',
      focusedSatellitesCount: 'satellites/focusedSatellitesCount'
    })
  },
  methods: {
    removeFromFocused(e, catalog_id) {
      this.focusedItems.delete(catalog_id)
      this.updateFocusedSatellites(this.focusedItems)
    },
    addToFocused(e, catalog_id) {
      this.focusedItems.add(catalog_id)
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
