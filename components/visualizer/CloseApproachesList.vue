<template>
  <ol v-if="events.length" class="close-approaches__list" role="list">
    <li
      v-for="event in formattedEvents"
      :key="event.id"
      class="close-approaches__item"
    >
      <div v-if="showEventType" class="close-approaches__item-title">
        <span v-if="event.is_prediction == 1">Predicted</span>
        {{ event.orbit }} Close Approach
      </div>
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
              :on-click="(e) => removeFromFocused(e, object.catalog_id)"
            >
              <Icon id="pin" name="pin" />
            </Button>
            <Button
              v-else
              :on-click="(e) => addToFocused(e, object.catalog_id)"
            >
              <Icon id="unpin" name="unpin" />
            </Button>
          </div>
        </li>
      </ul>
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
    }
  },
  computed: {
    formattedEvents() {
      let formattedEvents = this.events.map((event) => {
        const { catalog_id_1, catalog_id_2, min_distance, ...info } = event

        let objects = []
        let ids = [catalog_id_1, catalog_id_2]

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
      return formattedEvents
    },
    focusedItems() {
      return new Set(this.focusedSatellites)
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
    ...mapMutations({
      updateFocusedSatellites: 'satellites/updateFocusedSatellites'
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/components/close-approaches';
</style>
