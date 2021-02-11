<template>
  <div class="details__events">
    <h3>Historical Longitudes</h3>
    <p class="details-panel__desc">Coming soon.</p>
    <hr />
    <h3>Close Approaches</h3>
    <template v-if="numEvents === 0">
      <p class="details-panel__desc">
        This object has no cataloged key events yet. Learn more about the
        Dashboard's latest
        <nuxt-link to="/key-events">key events</nuxt-link> here.
      </p>
    </template>
    <template v-else>
      <p class="details-panel__desc">
        Choose a distance (km) below and find objects that have come within that
        range of <strong>{{ name }}</strong
        >.
      </p>
      <div class="details-events__totals">
        <h4 class="details-events__total">
          {{ numEvents }} {{ 'result' | pluralize(numEvents) }}
        </h4>
        <!-- <div class="details-events__sort form">
          <v-select
            v-model="currentSort"
            class="dropdown--simple"
            :clearable="false"
            :options="sortOptions"
            :searchable="false"
          >
            <template #selected-option="{ label }">
              <Icon id="sort" name="sort" />
              {{ label }}
            </template>
          </v-select>
        </div> -->
      </div>
      <CloseApproachesList :events="formattedEvents" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseApproachesList from '~/components/visualizer/CloseApproachesList.vue'

export default {
  components: {
    CloseApproachesList
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  async fetch() {
    const events = await this.$axios.$get(
      'https://satdash.wpengine.com/wp-json/satdash/v1/close_approaches/2207'
    )
    this.events = events
  },
  data() {
    return {
      activeTab: 'events',
      events: [],
      currentSort: 'min_distance',
      sortOptions: [
        { value: 'min_distance', label: 'Distance' },
        { value: 'time_of_close_approach', label: 'Date' }
      ]
    }
  },
  computed: {
    numEvents() {
      return this.events.length
    },
    // Add the name & status for satellites. Filter out the satellite's whose details we're viewing.
    formattedEvents() {
      let formattedEvents = this.events.map((event) => {
        const { catalog_id_1, catalog_id_2, min_distance, ...info } = event

        let objects = []
        let ids = [catalog_id_1, catalog_id_2].filter((d) => d !== this.id)

        for (let i = 0; i < ids.length; i++) {
          const id = ids[i]
          const { Name, Status, countryOfJurisdiction } = this.satellites[id]

          objects.push({
            catalog_id: id,
            Name,
            Status,
            countryOfJurisdiction
          })
        }

        return {
          objects,
          min_distance_km: +min_distance / 1000,
          ...info
        }
      })
      console.log(formattedEvents)
      return formattedEvents
    },
    ...mapState({
      satellites: (state) => state.satellites.satellites
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/components/close-approaches';
</style>
