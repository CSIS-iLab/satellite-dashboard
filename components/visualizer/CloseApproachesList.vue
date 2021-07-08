<template>
  <ol v-if="events.length" class="close-approaches__list" role="list">
    <li
      v-for="event in formattedEvents"
      :key="event.id"
      class="close-approaches__item"
    >
      <div v-if="showEventType" class="close-approaches__item-title">
        {{ event.orbit }} Close Approach
      </div>
      <nuxt-link :to="getEventUrl(event)" class="close-approaches__item-url">
        <Icon id="orbit" name="orbit" aria-label="View Close Approach" />
      </nuxt-link>
      <div
        :class="[
          showEventType
            ? 'close-approaches__item-meta'
            : 'close-approaches__item-title'
        ]"
      >
        {{ formatNumber(event.min_distance_km, 1) }}km
      </div>
      <div class="close-approaches__item-meta">
        <strong
          v-if="event.is_prediction == 1"
          class="close-approaches__predicted"
          >P</strong
        >
        {{ formatDate(event.time_of_close_approach) }}
      </div>
      <ul class="close-approaches__objects" role="list">
        <li
          v-for="object in event.objects"
          :key="object.catalog_id"
          class="sat__basic sat__basic--status"
          :data-status="object.Status"
        >
          <div class="sat__name">
            {{ object.Name }}
          </div>
          <div class="sat__id">{{ object.catalog_id }}</div>
          <div class="sat__country">
            {{ object.countryOfJurisdiction.id }}
          </div>
          <div class="sat__actions">
            <Button
              v-if="checkItemFocusedState(object.catalog_id)"
              aria-label="Pin Event"
              :on-click="(e) => removeFromFocused(e, object.catalog_id)"
            >
              <Icon id="pin" name="pin" focusable="false" />
            </Button>
            <Button
              v-else
              aria-label="Unpin Event"
              :on-click="(e) => addToFocused(e, object.catalog_id)"
            >
              <Icon id="unpin" name="unpin" focusable="false" />
            </Button>
          </div>
        </li>
      </ul>
      <div class="compare-objects">
        <Button
          aria-label="See historical orbits"
          :on-click="(e) => updateShowMagicChart(event.objects)"
          class="btn btn--outlined"
        >
          <Icon id="magic-chart" name="graph" focusable="false" />
          Compare Objects
        </Button>
      </div>
    </li>
  </ol>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Button from '~/components/global/Button'
import Icon from '~/components/global/Icon'

export default {
  name: 'CloseApproachesList',
  components: {
    Button,
    Icon
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    showEventType: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: String,
      required: false,
      default: null
    },
    name: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    formattedEvents() {
      let formattedEvents = this.events.map((event) => {
        const { catalog_id_1, catalog_id_2, ...info } = event

        let objects = []
        let ids = [catalog_id_1, catalog_id_2]

        if (this.id) {
          ids = ids.filter((d) => d !== this.id)
        }

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
          ...info
        }
      })
      return formattedEvents
    },
    focusedItems() {
      return new Set(this.focusedSatellites)
    },
    showMagicChart: {
      get: function() {
        return this.$store.state.layout.showMagicChart
      },
      set: function(magicChartState) {
        this.updateMagicChart({ magicChartState })
      }
    },
    ...mapState({
      satellites: (state) => state.satellites.satellites,
      focusedSatellites: (state) => state.satellites.focusedSatellites
    })
  },
  methods: {
    formatDate(date) {
      const event = new Date(date)

      const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }

      const timeOptions = {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      const formattedDate = event.toLocaleDateString('en-US', dateOptions)
      const formattedTime = event.toLocaleTimeString('en-US', timeOptions)

      return `${formattedDate} at ${formattedTime}`
    },
    formatNumber(value, minDecimals = 0) {
      let options = {}

      if (minDecimals !== 0) {
        options = {
          minimumFractionDigits: minDecimals,
          maximumFractionDigits: minDecimals
        }
      }

      return Number(value).toLocaleString('en-US', options)
    },
    checkItemFocusedState(catalog_id) {
      return this.focusedItems.has(catalog_id)
    },
    removeFromFocused(e, catalog_id) {
      this.focusedItems.delete(catalog_id)
      this.updateFocusedSatellites(this.focusedItems)
    },
    addToFocused(e, catalog_id) {
      this.focusedItems.add(catalog_id)
      this.updateFocusedSatellites(this.focusedItems)
    },
    getEventUrl(event) {
      const satIds = event.objects.map((d) => d.catalog_id)

      if (satIds.length === 1 && this.id) {
        satIds.push(this.id)
      }

      const date = new Date(event.time_of_close_approach)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      const formattedDate = [
        year,
        ('0' + (month + 1)).slice(-2),
        ('0' + day).slice(-2)
      ].join('-')

      const timeInSeconds = hours * 60 * 60 + minutes * 60 + seconds

      return `?satids=${satIds}&date=${formattedDate}&time=${timeInSeconds}`
    },
    updateShowMagicChart(objects) {
      const payload = {
        ids: [...objects.map((o) => o.catalog_id), this.id],
        names: [...objects.map((o) => o.Name), this.name]
      }
      this.showMagicChart = !this.showMagicChart
      this.updateLongitudeSatellites(payload)
    },
    ...mapMutations({
      updateFocusedSatellites: 'satellites/updateFocusedSatellites',
      updateMagicChart: 'layout/updateMagicChart',
      updateLongitudeSatellites: 'satellites/updateLongitudeSatellites'
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/components/close-approaches';
</style>
