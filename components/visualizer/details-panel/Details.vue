<template>
  <div class="details-details">
    <dl class="details__basic">
      <div v-for="item in info.basic" :key="item.value">
        <dt>
          <GlossaryTooltip
            v-if="item.tooltip"
            :id="item.tooltip"
            :show-info="true"
          >
            {{ item.label }}
          </GlossaryTooltip>
          <template v-else>{{ item.label }}</template>
        </dt>
        <dd>{{ satellite[item.value] || 'N/A' }}</dd>
      </div>
      <div>
        <dt class="visually-hidden">Status</dt>
        <dd>
          <div
            class="sat__basic sat__basic--status sat__basic--status-simple"
            :data-status="satellite.Status"
          >
            {{ statusTypes[satellite.Status].label }}
          </div>
        </dd>
      </div>
    </dl>
    <hr />
    <dl class="details__advanced">
      <div v-for="item in info.advanced" :key="item.value">
        <dt>
          <GlossaryTooltip
            v-if="item.tooltip"
            :id="item.tooltip"
            :show-info="true"
          >
            {{ item.label }}
          </GlossaryTooltip>
          <template v-else>{{ item.label }}</template>
        </dt>
        <dd>
          <template
            v-if="item.customFormatter && typeof item.formatter === 'function'"
          >
            {{ item.formatter(satellite[item.value]) || 'N/A' }}
          </template>
          <template v-else>
            {{ satellite[item.value] || 'N/A' }}
          </template>
        </dd>
      </div>
    </dl>
    <hr />
    <h3>Orbit</h3>
    <div v-if="hasOrbit">
      <p class="details-panel__small-desc">Last updated on {{ orbitSource }}</p>
      <dl class="details__orbit">
        <div v-for="item in info.orbit" :key="item.value">
          <!-- eslint-disable -->
          <dt>
            <GlossaryTooltip
              v-if="item.tooltip"
              :id="item.tooltip"
              :show-info="true"
            >
              <span v-html="item.label"></span>
            </GlossaryTooltip>
            <span v-else v-html="item.label"></span>
          </dt>
          <dd v-html="formattedOrbitData[item.value]"></dd>
          <!-- eslint-enable -->
        </div>
      </dl>
    </div>
    <p v-else class="details-panel__small-desc">
      This object is not yet in orbit.
    </p>
    <hr />
    <h3>Nearby ITU Filings</h3>
    <p class="details-panel__small-desc">
      This list includes ITU filings near
      {{ orbitalElements.Longitude.label }}.
    </p>
    <vue-good-table
      v-if="ITUFilings.length"
      :rows="ITUFilings"
      :columns="ITUColumns"
      style-class="vgt-table striped"
      :sort-options="{
        enabled: false
      }"
    >
      <template slot="table-column" slot-scope="props">
        <div class="itu__basic">
          {{ props.column.label }}
        </div>
      </template>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'longitude'" class="itu__longitude">
          {{ formatLongitude(props.row.longitude) }}
        </span>
        <span v-else-if="props.column.field == 'country'" class="itu__country">
          {{ props.row.country }}
        </span>
        <span v-else-if="props.column.field == 'bands'" class="itu__bands">
          {{ props.row.bands }}
        </span>
        <span v-else-if="props.column.field == 'link'" class="itu__link">
          <a
            :href="props.row.link"
            target="_blank"
            aria-label="View ITU Filing"
          >
            <Icon id="link" name="external-link" focusable="false" />
          </a>
        </span>
      </template>
    </vue-good-table>
    <p v-else class="details-panel__no-itu">
      No ITU Filings available for this satellite.
    </p>
    <template v-if="satellite.comments">
      <hr />
      <h3>Comments</h3>
      <ul
        v-for="comment in satellite.comments"
        :key="comment.date"
        class="details-panel__comments"
        role="list"
      >
        <li>
          <div v-html="comment.description"></div>
          <div class="details-panel__comments-date">
            {{ formatDate(comment.date, true) }}
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Icon from '~/components/global/Icon.vue'
import timeEventsProvider from '../../../services/time-events'
const timeEvents = timeEventsProvider()

export default {
  components: {
    Icon
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    satellite: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    let self = this
    return {
      info: {
        basic: [
          {
            value: 'alternate_name',
            label: 'Alternate Name(s)',
            tooltip: 'alternate-name'
          },
          {
            value: 'NoradId',
            label: 'NORAD ID (SATCAT)',
            tooltip: 'norad-id-satellite-catalog-number'
          }
        ],
        advanced: [
          { value: 'Purpose', label: 'Purpose', tooltip: 'purpose' },
          { value: 'Type', label: 'Type', tooltip: 'type' },
          { value: 'Operator', label: 'Operator', tooltip: 'operator' },
          { value: 'LaunchDate', label: 'Launch Date', tooltip: 'launch-date' },
          {
            value: 'countryOfLaunch',
            label: 'Country',
            tooltip: 'country-of-launch-site',
            customFormatter: true,
            formatter: function(value) {
              return self.formatCountries(value)
            }
          },
          { value: 'LaunchSite', label: 'Launch Site', tooltip: 'launch-site' },
          {
            value: 'LaunchVehicle',
            label: 'Launch Vehicle',
            tooltip: 'launch-vehicle'
          },
          { value: 'Contractor', label: 'Contractor', tooltip: 'contractor' },
          {
            value: 'Lifetime',
            label: 'Lifetime (years)',
            tooltip: 'lifetime (years)',
            customFormatter: true,
            formatter: function(value) {
              return `${value} years`
            }
          }
        ],
        orbit: [
          {
            value: 'Apogee',
            label: 'Apogee Altitude',
            tooltip: 'apogee-altitude'
          },
          {
            value: 'ArgP',
            label: 'Argument of perigee',
            tooltip: 'argument-of-perigee'
          },
          {
            value: 'Perigee',
            label: 'Perigee Altitude',
            tooltip: 'perigee-altitude'
          },
          { value: 'Ecc', label: 'Eccentricity', tooltip: 'eccentricity' },
          { value: 'Inc', label: 'Inclination', tooltip: 'inclination-2' },
          { value: 'Longitude', label: 'Longitude', tooltip: 'longitude' },
          {
            value: 'MeanMotion',
            label: 'Mean Motion',
            tooltip: 'mean-motion'
          },
          {
            value: 'OrbitalPeriod',
            label: 'Orbital Period',
            tooltip: 'orbital-period'
          },
          {
            value: 'OrbitalSpeed',
            label: 'Mean Orbital Speed',
            tooltip: 'orbital-speed'
          },
          {
            value: 'SMA',
            label: 'Semi-major axis',
            tooltip: 'semi-major-axis'
          },
          {
            value: 'RAAN',
            label: 'RAAN',
            tooltip: 'right-ascension-of-the-ascending-node-raan'
          },
          { value: 'Epoch', label: 'Epoch' },
          { value: 'Source', label: 'Source' }
        ]
      },
      earthRadius: 6378136.3, // m
      mu: 3.986004415e14, // m^3/s^2,
      elementIndex: 0,
      ITUColumns: [
        {
          label: 'Long.',
          field: 'longitude'
        },
        { label: 'Co.', field: 'country' },
        { label: 'Bands', field: 'bands' },
        { label: 'Link', field: 'link' }
      ]
    }
  },
  computed: {
    hasOrbit() {
      if (!this.satelliteAllOrbits || !this.satelliteAllOrbits.length) {
        return false
      }

      return true
    },
    satelliteAllOrbits() {
      if (!this.orbits[this.id]) {
        return []
      }
      return this.orbits[this.id].orbits
    },
    orbitalElements() {
      const index = this.satelliteAllOrbits[this.elementIndex]
        ? this.elementIndex
        : 0
      return this.satelliteAllOrbits[index].elements
    },
    formattedOrbitData() {
      const Apogee = `${this.formatNumbers(
        (this.orbitalElements.SMA * (1 + this.orbitalElements.Ecc) -
          this.earthRadius) /
          1000
      )} km`

      const Perigee = `${this.formatNumbers(
        (this.orbitalElements.SMA * (1 - this.orbitalElements.Ecc) -
          this.earthRadius) /
          1000
      )} km`

      const ArgP = `${this.formatNumbers(
        (this.orbitalElements.ArgP * 180) / Math.PI,
        4
      )}&deg;`

      const RAAN = `${this.formatNumbers(
        (this.orbitalElements.RAAN * 180) / Math.PI,
        4
      )}&deg;`

      const Ecc = `${this.formatNumbers(this.orbitalElements.Ecc, 4)}`

      const Inc = `${this.formatNumbers(
        this.orbitalElements.Inc / Math.PI,
        4
      )}&deg;`

      const mmo = Math.sqrt(
        this.mu /
          (this.orbitalElements.SMA *
            this.orbitalElements.SMA *
            this.orbitalElements.SMA)
      )

      const MeanMotion = `${this.formatNumbers(
        (mmo * 180) / Math.PI,
        4
      )}&deg;/s`

      const OrbitalPeriod = (2 * Math.PI) / mmo
      const OrbitalPeriodDisplay = this.secondsToDhms(OrbitalPeriod)

      const SMA = `${this.formatNumbers(this.orbitalElements.SMA / 1000)} km`

      const OrbitalSpeed = `
        ${this.formatNumbers(
          (((2 * Math.PI * this.orbitalElements.SMA) / OrbitalPeriod) *
            (1 -
              (1 / 4) * this.orbitalElements.Ecc ** 2 -
              (3 / 64) * this.orbitalElements.Ecc ** 4 -
              (5 / 256) * this.orbitalElements.Ecc ** 6 -
              (175 / 16384) * this.orbitalElements.Ecc ** 8)) /
            1000,
          1
        )} km/s`

      const Longitude = this.orbitalElements.Longitude.label

      const Epoch = this.formatDate(this.orbitalElements.Epoch)

      const Source = this.satelliteAllOrbits[0].source.name

      return {
        Apogee,
        ArgP,
        Perigee,
        Ecc,
        Inc,
        Longitude,
        MeanMotion,
        OrbitalPeriod: OrbitalPeriodDisplay,
        OrbitalSpeed,
        SMA,
        RAAN,
        Epoch,
        Source
      }
    },
    orbitSource() {
      const index = this.satelliteAllOrbits[this.elementIndex]
        ? this.elementIndex
        : this.satelliteAllOrbits.length - 1
      return `${this.formatDate(
        this.satelliteAllOrbits[index].source.last_updated
      )}`
    },
    currentDate() {
      const index = this.satelliteAllOrbits[this.elementIndex]
        ? this.elementIndex
        : this.satelliteAllOrbits.length - 1
      return this.formatDate(this.satelliteAllOrbits[index].epoch)
    },
    ITUFilings() {
      return this.nearbyITU(this.orbitalElements.Longitude.degrees)
    },
    ...mapState({
      orbits: (state) => state.satellites.orbits,
      statusTypes: (state) => state.satellites.statusTypes
    }),
    ...mapGetters({
      nearbyITU: 'satellites/ITUDataNearLongitude'
    })
  },
  mounted() {
    timeEvents.addListener('dateChanged', this.setElementIndex)
  },
  beforeDestroy() {
    timeEvents.removeListener('dateChanged', this.setElementIndex)
  },
  methods: {
    formatCountries(countryField) {
      return countryField.map((d) => d.label).join(' / ')
    },
    formatDate(date, dateOnly = false) {
      const event = new Date(date)

      let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      if (dateOnly) {
        options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }

        return event.toLocaleDateString('en-US', options)
      }

      return event.toLocaleString('en-US', options)
    },
    secondsToDhms(seconds) {
      seconds = Number(seconds)
      const d = Math.floor(seconds / (3600 * 24))
      const h = Math.floor((seconds % (3600 * 24)) / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = Math.floor(seconds % 60)

      const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
      const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
      const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
      const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
      return dDisplay + hDisplay + mDisplay + sDisplay
    },
    setElementIndex(index) {
      this.elementIndex = index
    },
    formatNumbers(num, minDecimals = 0) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: minDecimals
      })
    },
    formatLongitude(longitude) {
      return `${Math.abs(longitude)}°${longitude < 0 ? 'W' : 'E'}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/vgt-table';
@import '../assets/css/components/itu-block';
</style>
