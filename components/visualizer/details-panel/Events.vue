<template>
  <div class="details-events">
    <highcharts
      ref="chart"
      :constructor-type="'stockChart'"
      class="hc sub-chart"
      :options="chartOptions"
    />
    <hr />
    <h3>Close Approaches</h3>
    <template v-if="totalEvents === 0">
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
      <form class="form details-events__form" @submit.prevent>
        <input
          id="distance_range"
          v-model="maxDistance"
          type="range"
          name="distance"
          min="10"
          max="150"
          step="1"
        />

        <label for="distance" class="visually-hidden"
          >Max Close Approach Distance (km):</label
        >
        <input
          id="distance"
          v-model="maxDistance"
          class="form__input form__input--sm details-events__input"
          type="number"
          name="distance"
          min="10"
          max="150"
          step="any"
        />

        <Button class="btn--apply" :on-click="updateMaxDistance">
          <Icon id="check" name="check" focusable="false" aria-hidden="true" />
          Apply
        </Button>
      </form>
      <div class="details-events__totals">
        <h4 class="details-events__total">
          {{ totalFilteredEvents }}
          {{ 'result' | pluralize(totalFilteredEvents) }}
        </h4>
        <div class="details-events__sort form">
          <v-select
            v-model="currentSort"
            class="dropdown--simple"
            :clearable="false"
            :options="sortOptions"
            :searchable="false"
            :value="currentSort"
            :reduce="(sortOptions) => sortOptions.value"
          >
            <template #selected-option="{ label }">
              <Icon id="sort" name="sort" />
              {{ label }}
            </template>
          </v-select>
        </div>
      </div>
      <CloseApproachesList
        :id="id"
        :events="filteredEvents"
        class="details-events__list"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseApproachesList from '~/components/visualizer/CloseApproachesList.vue'
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    CloseApproachesList,
    Button,
    Icon
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
      `/wp-json/satdash/v1/close_approaches/${this.id}`
    )
    this.events = events
  },
  data() {
    return {
      activeTab: 'events',
      events: [],
      maxDistance: 50,
      appliedMaxDistance: 50,
      currentSort: 'min_distance_km',
      sortOptions: [
        { value: 'min_distance_km', label: 'Distance' },
        { value: 'time_of_close_approach', label: 'Date' }
      ],
      chartOptions: {
        title: {
          text: 'Historical Longitudes'
        },
        chart: {
          styledMode: true,
          height: 550,
          marginTop: 0,
          marginBottom: 40,
          marginLeft: 0,
          marginRight: 0
        },
        legend: { enabled: true },
        xAxis: { title: { text: 'Datetime', margin: -50 } },
        yAxis: {
          opposite: false,
          title: {
            text: 'Longitude',
            x: 60,
            reserveSpace: false
          }
        },
        rangeSelector: {
          inputEnabled: false,
          allButtonsEnabled: false,
          buttons: [
            {
              type: 'ytd',
              text: 'YTD',
              title: 'View year to date'
            },
            {
              type: 'year',
              count: 1,
              text: '1y',
              title: 'View 1 year'
            },
            {
              type: 'all',
              text: 'All',
              title: 'View all'
            }
          ]
        },
        series: [
          {
            name: 'Sat 1',
            data: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
          }
        ]
      }
    }
  },
  computed: {
    totalEvents() {
      return this.events.length
    },
    totalFilteredEvents() {
      return this.filteredEvents.length
    },
    filteredEvents() {
      let events = this.events.filter(
        (d) => d.min_distance_km <= this.appliedMaxDistance
      )

      if (this.currentSort === 'time_of_close_approach') {
        events.sort(
          (a, b) =>
            new Date(a[this.currentSort]) - new Date(b[this.currentSort])
        )
      } else if (this.currentSort === 'min_distance_km') {
        events.sort((a, b) => a[this.currentSort] - b[this.currentSort])
      }

      return events
    },
    ...mapState({
      satellites: (state) => state.satellites.satellites
    })
  },
  methods: {
    updateMaxDistance() {
      this.appliedMaxDistance = this.maxDistance
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/components/highcharts-theme';

.sub-chart {
  max-width: 100%;
  max-height: 100%;
}
</style>
