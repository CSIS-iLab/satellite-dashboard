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
          <button @click="applyFilters">Apply</button>
        </div>
      </template>
      <template v-else>
        {{ activeFiltersList }}
        <button @click="editFilters">Edit Filters</button>
      </template>
    </div>
    <hr />
    <button @click="applyFilterTest">Test Filter</button>
    <button @click="resetFilters">Reset</button>
    {{ numSatellites }} Results<br />
    <table border="1" borderColor="#fff" cellSpacing="0">
      <thead>
        <tr>
          <td>Catalog Id</td>
          <td>Name</td>
        </tr>
      </thead>
      <tr v-for="sat in activeSatellites" :key="sat">
        <td>{{ sat }}</td>
        <td>{{ satellites[sat].meta.Name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    Icon
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
    }
  },
  methods: {
    editFilters() {
      this.isEditing = true
    },
    selectFilter(value) {
      this.visibleFilters.push(value.value)
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
    applyFilterTest() {
      console.log('apply the filter!')
      const filteredSatellites = Object.values(this.satellites)
        .filter((sat) => sat.meta.countryOfLaunch === 'US')
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
