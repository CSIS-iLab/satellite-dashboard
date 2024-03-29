<template>
  <div class="details-events">
    <highcharts
      v-if="dataLoaded"
      ref="chart"
      key="details-chart"
      class="details-chart"
      :options="chartOptions"
    />
    <div v-else>Loading satellite data...</div>
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
        :name="name"
        :events="filteredEvents"
        class="details-events__list"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  data() {
    return {
      dataLoaded: false,
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
          text: 'Historical Longitudes',
          margin: 26,
          align: 'left'
        },
        chart: {
          styledMode: true,
          height: 350,
          spacingLeft: 0
        },
        boost: { enabled: false, seriesThreshold: 10000 },
        plotOptions: {
          turboThreshold: 10000,
          series: {
            enableMouseTracking: false,
            marker: {
              enabled: false
            }
          }
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        legend: { enabled: false },
        tooltip: { enabled: false },
        xAxis: {
          maxPadding: 0.3,
          minPadding: 0.3,
          visible: false
        },
        yAxis: {
          maxPadding: 0,
          minPadding: 0,
          opposite: false,
          title: {
            text: '',
            reserveSpace: true
          },
          /* labels: { format: '{value}°' } */
          labels: {
            formatter: (label) =>
              `${Math.abs(label.value)}°${label.value < 0 ? 'W' : 'E'}`
          }
        },
        rangeSelector: {
          inputEnabled: false,
          allButtonsEnabled: false
        },
        series: []
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
            new Date(b[this.currentSort]) - new Date(a[this.currentSort])
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
  watch: {
    id: {
      handler() {
        this.dataLoaded = false
        this.fetch()
        this.longitudes()
      },
      immediate: true
    }
  },
  methods: {
    updateMaxDistance() {
      if (this.maxDistance < 0 || this.maxDistance > 150) return
      this.appliedMaxDistance = this.maxDistance
    },
    async longitudes() {
      const {
        names,
        historical_longitudes,
        predicted_longitudes
      } = await this.getLongitudes({
        _ids: [this.id]
      })

      historical_longitudes.forEach((l, i) => {
        // take sampling of data (limits total data points which is necessary
        // for turboBoost issues
        let modulus = 1
        let len = historical_longitudes[i].data.length
        if (len > 1000) {
          modulus = Math.max(2, Math.ceil(len / 1000))
        }
        const data = historical_longitudes[i].data.reduce((a, v, i) => {
          if (i % modulus === 0) a.push(v)
          return a
        }, [])

        // add data labels to first and last point
        const labelPoints = [0, data.length - 1]
        labelPoints.forEach((l) => {
          data[l] = {
            x: data[l][0],
            y: data[l][1],
            dataLabels: {
              x: l ? 25 : -25,
              y: l ? 3 : -3,
              crop: false,
              overflow: 'none',
              enabled: true,
              formatter: function() {
                return `
                <div class="label-y">${Math.abs(this.y).toFixed(0)}°${
                  this.y < 0 ? 'W' : 'E'
                }</div>
                <br />
                <div class="label-x">${new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short'
                }).format(new Date(this.x))}</div>`
              }
            }
          }
        })
        this.chartOptions.series[i] = { data }
        this.chartOptions.series[i].name = `${this.name}`
      })

      // render chart after data is loaded
      this.dataLoaded = true
    },
    async fetch() {
      const events = await this.$axios.$get(
        `/wp-json/satdash/v1/close_approaches/${this.id}`
      )
      this.events = events
    },
    ...mapActions({
      getLongitudes: 'satellites/getLongitudes'
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/components/details-chart';
</style>
