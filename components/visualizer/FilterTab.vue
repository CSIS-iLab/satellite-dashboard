<template>
  <div>
    <h2 class="panel__title">{{ numActiveFilters }} filters</h2>

    <div class="filters form">
      <template v-if="isEditing" class="form">
        <p v-show="numVisibleFilters == 0">
          Please apply at least one filter to view results.
        </p>

        <div v-for="filter in visibleFilters" :key="filter">
          <label :for="'filter__' + filter" class="form__label">
            {{ filterOptions[filter].label }}
            <Button :on-click="(e) => deleteFilter(e, filter)">
              <Icon id="trash" class="icon" name="trash" />
            </Button>
          </label>
          <v-select
            :id="'filter__' + filter"
            v-model="activeFilterValues[filter]"
            class="form__input"
            :options="filterValueOptions[filter]"
            :reduce="(option) => option.value"
            multiple
          >
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <Icon id="plus" class="icon" name="plus" />
                <Icon id="minus" class="icon" name="minus" />
              </span>
            </template>
            <template #option="{ label }">
              <Icon id="check" class="icon" name="check" />{{ label }}
            </template>
          </v-select>
        </div>

        <label for="selectFilter">Add a filter</label>
        <v-select
          id="selectFilter"
          class="form__input"
          :clearable="false"
          :options="Object.values(filterOptions)"
          :selectable="(option) => !activeFilters.includes(option.value)"
          @input="selectFilter"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <Icon id="plus" class="icon" name="plus" />
              <Icon id="minus" class="icon" name="minus" />
            </span>
          </template>
        </v-select>
        <div v-show="numVisibleFilters">
          <Button :on-click="applyFilters">Apply</Button>
          <Button :on-click="resetFilters">Reset</Button>
        </div>
      </template>
      <template v-else>
        {{ activeFiltersList }}
        <Button :on-click="editFilters">Edit Filters</Button>
      </template>
    </div>
    <FilterResults
      :satellites="activeSatelliteMeta"
      :total-results="numSatellites"
    />
  </div>
</template>

<script>
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
      isEditing: true,
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
      activeFilters: [],
      activeFilterValues: {
        countryOfJurisdiction: [],
        Name: [],
        NoradId: [],
        Purpose: [],
        Users: [],
        Status: []
      },
      visibleFilters: []
    }
  },
  computed: {
    numVisibleFilters() {
      return this.visibleFilters.length
    },
    numActiveFilters() {
      return this.activeFilters.length
    },
    activeFiltersList() {
      return this.activeFilters
        .map((d) => this.filterOptions[d].label)
        .join(', ')
    },
    satellites() {
      return this.$store.state.satellites.satellites
    },
    ...mapGetters({
      activeSatellites: 'satellites/activeSatellites',
      numSatellites: 'satellites/activeSatellitesCount'
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

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i]
        filters.countryOfJurisdiction.add(sat.meta.countryOfJurisdiction)
        filters.Purpose.add(sat.meta.Purpose)
        filters.Users.add(sat.meta.Operator)
        filters.Name.add(sat.meta.Name)
        filters.NoradId.add(sat.meta.NoradId)
        filters.Status.add(sat.meta.Status)
      }

      for (const key in filters) {
        filters[key] = [...filters[key]].map((d) => ({ value: d, label: d }))
      }

      console.log(filters)

      return filters
    },
    activeSatelliteMeta() {
      let results = []
      for (let i = 0; i < this.activeSatellites.length; i++) {
        const catalog_id = this.activeSatellites[i]
        const { Name, Status, countryOfJurisdiction } = this.satellites[
          catalog_id
        ].meta
        results.push({
          catalog_id,
          Name,
          Status,
          country: countryOfJurisdiction.substring(0, 3)
        })
      }

      console.log(results)
      return results
    }
  },
  methods: {
    editFilters() {
      this.isEditing = true
    },
    selectFilter(value) {
      this.visibleFilters.push(value.value)
    },
    deleteFilter(e, filter) {
      this.activeFilterValues[filter] = []
      this.visibleFilters = this.visibleFilters.filter((d) => d !== filter)
    },
    applyFilters() {
      console.log('apply the filter!')
      this.isEditing = false
      this.activeFilters = this.visibleFilters

      let filters = {}
      for (let i = 0; i < this.activeFilters.length; i++) {
        const filter = this.activeFilters[i]
        filters[filter] = this.activeFilterValues[filter]
      }

      console.log(filters)

      const filteredSatellites = Object.values(this.satellites)
        .filter(function(item) {
          for (var key in filters) {
            if (
              item.meta[key] === undefined ||
              !filters[key].includes(item.meta[key])
            )
              return false
          }
          return true
        })
        .map((sat) => sat.catalog_id)

      console.log(filteredSatellites)
      this.updateActiveSatellites(filteredSatellites)
    },
    resetFilters() {
      console.log('reset filters')
      // Clear Filters
      let filters = {}
      for (let i = 0; i < this.activeFilters.length; i++) {
        const filter = this.activeFilters[i]
        this[filter] = []
      }
      this.activeFilters = []
      this.visibleFilters = []

      // Reset Satellite Ids
      const filteredSatellites = Object.keys(this.satellites)
      this.updateActiveSatellites(filteredSatellites)
    },
    ...mapMutations({
      updateActiveSatellites: 'satellites/updateActiveSatellites'
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/form-input';
</style>
