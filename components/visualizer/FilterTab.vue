<template>
  <div>
    <h2 class="panel__title" :data-is-faded="isEditable">
      {{ numActiveFilters }} {{ 'filter' | pluralize(numActiveFilters) }}
    </h2>
    <p>
      Apply a filter to search for space objects. View an object in orbit using
      the orbit icon. Pin an object to the focus list using the pin icon.
    </p>

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
      :satellites="filteredSatelliteMeta"
      :total-results="numSatellites"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
        countryOfJurisdictionIds: {
          value: 'countryOfJurisdictionIds',
          label: 'Country of Jurisdiction'
        },
        Purpose: { value: 'Purpose', label: 'Purpose' },
        Users: { value: 'Users', label: 'Users' },
        Status: { value: 'Status', label: 'Status' }
      },
      activeFilterValues: {},
      visibleFilters: [],
      visibleFilterValues: {
        countryOfJurisdictionIds: [],
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
    filterValueOptions() {
      let filters = {
        Purpose: new Set(),
        Users: new Set(),
        Name: new Set(),
        NoradId: new Set()
      }

      const satellites = Object.values(this.satellites)

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i]
        filters.Purpose.add(sat.Purpose)
        filters.Users.add(sat.Operator)
        filters.Name.add(sat.Name)
        filters.NoradId.add(sat.NoradId)
      }

      for (const key in filters) {
        filters[key] = [...filters[key]]
          .sort()
          .map((d) => ({ value: d, label: d }))
      }

      // Status
      filters.Status = this.statusTypesKeys.map((d) => ({
        value: d,
        label: this.statusTypes[d].label
      }))

      // countryOfJurisdiction
      filters.countryOfJurisdictionIds = this.countriesOfJurisdiction

      return filters
    },
    filteredSatelliteMeta() {
      let results = []
      for (let i = 0; i < this.filteredSatellites.length; i++) {
        const catalog_id = this.filteredSatellites[i]
        const { Name, Status, countryOfJurisdiction } = this.satellites[
          catalog_id
        ]

        results.push({
          catalog_id,
          Name,
          Status,
          country: countryOfJurisdiction
        })
      }

      console.log('filteredSatelliteMeta')
      return results
    },
    ...mapState({
      satellites: (state) => state.satellites.satellites,
      filteredSatellites: (state) => state.satellites.filteredSatellites,
      activeFilters: (state) => state.filters.activeFilters,
      statusTypes: (state) => state.satellites.statusTypes,
      countriesOfJurisdiction: (state) =>
        state.satellites.countriesOfJurisdiction
    }),
    ...mapGetters({
      satelliteCatalogIds: 'satellites/satelliteCatalogIds',
      numSatellites: 'satellites/filteredSatellitesCount',
      numActiveFilters: 'filters/activeFiltersCount',
      statusTypesKeys: 'satellites/statusTypesKeys'
    })
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
            if (item[key] !== undefined && filters[key].includes(item[key])) {
              return true
            } else if (
              item[key] !== undefined &&
              filters[key].some((filterCountryId) =>
                item[key].includes(filterCountryId)
              )
            ) {
              return true
            }
          }
          return false
        })
        .map((sat) => sat.catalog_id)

      this.updateFilteredSatellites(filteredSatellites)
      this.updateVisibleSatellites(filteredSatellites)
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
      this.updateFilteredSatellites([])
      this.updateVisibleSatellites(this.satelliteCatalogIds)
    },
    ...mapMutations({
      updateFilteredSatellites: 'satellites/updateFilteredSatellites',
      updateActiveFilters: 'filters/updateActiveFilters',
      updateVisibleSatellites: 'satellites/updateVisibleSatellites'
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
