<template>
  <div>
    <h2 class="panel__title" :data-is-faded="isEditable">
      {{ numActiveFilters }} {{ 'filter' | pluralize(numActiveFilters) }}
    </h2>

    <div class="filters">
      <form v-if="isEditable" class="form" @submit.prevent>
        <p v-show="numVisibleFilters == 0">
          Please apply at least one filter to view results.
        </p>

        <div v-for="filter in visibleFilters" :key="filter">
          <label :for="'filter__' + filter" class="form__label">
            {{ filterOptions[filter].label }}
            <Button :on-click="(e) => deleteFilter(e, filter)">
              <Icon id="trash" name="trash" />
            </Button>
          </label>
          <v-select
            :id="'filter__' + filter"
            v-model="visibleFilterValues[filter]"
            class="form__input"
            :options="filterValueOptions[filter]"
            :reduce="(option) => option.value"
            placeholder="Type to search"
            multiple
            required
          >
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <Icon id="plus" name="plus" />
                <Icon id="minus" name="minus" />
              </span>
            </template>
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                :required="!visibleFilterValues[filter]"
                v-bind="attributes"
                v-on="events"
              />
            </template>
            <template #option="{ label }">
              <Icon id="check" name="check" />{{ label }}
            </template>
          </v-select>
        </div>

        <client-only>
          <v-select
            id="selectFilter"
            v-model="latestFilterAdded"
            placeholder="Add a filter"
            class="form__input"
            :clearable="false"
            :options="availableFilterOptions"
            :disabled="availableFilterOptions.length === 0"
            :searchable="false"
            @input="selectFilter"
          >
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <Icon id="plus" name="plus" />
                <Icon id="minus" name="minus" />
              </span>
            </template>
          </v-select>
        </client-only>
        <div v-show="numVisibleFilters" class="filters__buttons">
          <Button :on-click="removeAllFilters">Remove All</Button>
          <Button :on-click="applyFilters" type="submit">
            <Icon id="check" name="check" /> Apply
          </Button>
          <Button :on-click="cancelFilters">Cancel</Button>
        </div>
      </form>
      <div v-else class="filters__list">
        {{ listActiveFilters }}
        <Button class="btn--contained btn--icon" :on-click="editFilters">
          <Icon id="pen" name="pen" />
        </Button>
      </div>
    </div>
    <FilterResults
      v-if="numActiveFilters > 0"
      :satellites="activeSatelliteMeta"
      :total-results="numSatellites"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'
import FilterResults from '~/components/visualizer/FilterResults.vue'

export default {
  components: {
    Button,
    Icon,
    FilterResults
  },
  data: function() {
    return {
      isEditable: true,
      filterOptions: {
        Name: { value: 'Name', label: 'Name' },
        NoradId: { value: 'NoradId', label: 'Norad ID' },
        countryOfJurisdiction: {
          value: 'countryOfJurisdiction',
          label: 'Country of Jurisdiction'
        },
        Purpose: { value: 'Purpose', label: 'Purpose' },
        Users: { value: 'Users', label: 'Users' },
        Status: { value: 'Status', label: 'Status' }
      },
      activeFilterValues: {},
      visibleFilters: [],
      visibleFilterValues: {
        countryOfJurisdiction: [],
        Name: [],
        NoradId: [],
        Purpose: [],
        Users: [],
        Status: []
      },
      latestFilterAdded: null
    }
  },
  computed: {
    numVisibleFilters() {
      return this.visibleFilters.length
    },
    listActiveFilters() {
      return this.activeFilters
        .map((d) => this.filterOptions[d].label)
        .join(', ')
    },
    availableFilterOptions() {
      return Object.keys(this.filterOptions)
        .filter((d) => !this.visibleFilters.includes(d))
        .map((d) => this.filterOptions[d])
    },
    ...mapState({
      satellites: (state) => state.satellites.satellites
    }),
    ...mapGetters({
      activeSatellites: 'satellites/activeSatellites',
      numSatellites: 'satellites/activeSatellitesCount',
      activeFilters: 'filters/activeFilters',
      numActiveFilters: 'filters/activeFiltersCount'
    }),
    filterValueOptions() {
      let filters = {
        countryOfJurisdiction: new Set(),
        Purpose: new Set(),
        Users: new Set(),
        Name: new Set(),
        NoradId: new Set(),
        Status: new Set()
      }

      const satellites = Object.values(this.satellites)

      const countries = [
        ...new Set(
          satellites
            .map((d) => [d.countryOfJurisdiction, d.countryOfLaunch])
            .flat()
        )
      ]
      console.log(countries)

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i]
        filters.countryOfJurisdiction.add(sat.countryOfJurisdiction)
        filters.Purpose.add(sat.Purpose)
        filters.Users.add(sat.Operator)
        filters.Name.add(sat.Name)
        filters.NoradId.add(sat.NoradId)
        filters.Status.add(sat.Status)
      }

      for (const key in filters) {
        filters[key] = [...filters[key]]
          .sort()
          .map((d) => ({ value: d, label: d }))
      }

      return filters
    },
    activeSatelliteMeta() {
      let results = []
      for (let i = 0; i < this.activeSatellites.length; i++) {
        const catalog_id = this.activeSatellites[i]
        const { Name, Status, countryOfJurisdiction } = this.satellites[
          catalog_id
        ]

        results.push({
          catalog_id,
          Name,
          Status,
          country: countryOfJurisdiction.substring(0, 3)
        })
      }

      console.log('activeSatelliteMeta')
      return results
    }
  },
  methods: {
    editFilters() {
      this.isEditable = true
    },
    selectFilter(value) {
      this.visibleFilters.push(value.value)
      this.latestFilterAdded = null
    },
    deleteFilter(e, filter) {
      this.activeFilterValues[filter] = []
      this.visibleFilterValues[filter] = []
      this.visibleFilters = this.visibleFilters.filter((d) => d !== filter)
    },
    applyFilters() {
      console.log('apply the filter!')
      this.isEditable = false
      this.updateActiveFilters([...this.visibleFilters])
      this.activeFilterValues = Object.assign({}, this.visibleFilterValues)

      let filters = {}
      for (let i = 0; i < this.activeFilters.length; i++) {
        const filter = this.activeFilters[i]
        filters[filter] = this.activeFilterValues[filter]
      }

      // "OR" relationship: objects only need to meet one of the filter values to be returned.
      const filteredSatellites = Object.values(this.satellites)
        .filter(function(item) {
          for (var key in filters) {
            if (item[key] !== undefined && filters[key].includes(item[key]))
              return true
          }
          return false
        })
        .map((sat) => sat.catalog_id)

      this.updateActiveSatellites(filteredSatellites)
    },
    removeAllFilters() {
      console.log('reset filters')
      // Clear Filters
      let filters = {}
      for (let i = 0; i < this.activeFilters.length; i++) {
        const filter = this.activeFilters[i]
        this.visibleFilterValues[filter] = []
      }
      this.activeFilterValues = {}
      this.updateActiveFilters([])
      this.visibleFilters = []

      // Reset Satellite Ids
      const filteredSatellites = Object.keys(this.satellites)
      this.updateActiveSatellites(filteredSatellites)
    },
    ...mapMutations({
      updateActiveSatellites: 'satellites/updateActiveSatellites',
      updateActiveFilters: 'filters/updateActiveFilters'
    }),
    cancelFilters() {
      console.log('cancel the filters')
      // Reset visible state to match the previous "apply" results
      this.visibleFilterValues = Object.assign({}, this.activeFilterValues)
      this.visibleFilters = [...this.activeFilters]

      this.isEditable = false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/filter-panel';
@import '../assets/css/components/form-input';
</style>
