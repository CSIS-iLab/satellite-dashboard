<template>
  <div>
    <h2>{{ numActiveFilters }} filters</h2>
    <template v-if="isEditing" class="form">
      <p v-show="numVisibleFilters == 0">
        Please apply at least one filter to view results.
      </p>

      <template v-if="visibleFilters.includes('countryOfLaunch')">
        <label>Country of Jurisdiction</label>
        <v-select
          v-model="countryOfLaunch"
          multiple
          :options="countries"
          :reduce="(option) => option.value"
        ></v-select>
      </template>

      <label for="selectFilter">Add a filter</label>
      <v-select
        id="selectFilter"
        :clearable="false"
        :options="filterOptions"
        :selectable="(option) => !activeFilters.includes(option.value)"
        @input="selectFilter"
      ></v-select>
      <div v-show="numVisibleFilters">
        <button @click="applyFilters">Apply</button>
      </div>
    </template>
    <template v-else>
      {{ activeFilters }}
      <button @click="editFilters">Edit Filters</button>
    </template>
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
        <td>{{ satellites[sat].source1.Name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data: function() {
    return {
      isEditing: true,
      filterOptions: [
        { value: 'Name', label: 'Name' },
        { value: 'COSPAR', label: 'COSPAR' },
        {
          value: 'countryOfLaunch',
          label: 'Country of Jurisdiction'
        },
        { value: 'Purpose', label: 'Purpose' },
        { value: 'Users', label: 'Users' },
        { value: 'Status', label: 'Status' }
      ],
      activeFilters: [],
      visibleFilters: [],
      countries: [
        { value: 'US', label: 'United States' },
        { value: 'JPN', label: 'Japan' }
      ],
      countryOfLaunch: []
    }
  },
  computed: {
    numVisibleFilters() {
      return this.visibleFilters.length
    },
    numActiveFilters() {
      return this.activeFilters.length
    },
    satellites() {
      return this.$store.state.satellites.satellites
    },
    ...mapGetters({
      activeSatellites: 'satellites/activeSatellites',
      numSatellites: 'satellites/activeSatellitesCount'
    })
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
        filters[filter] = this[filter]
      }

      console.log(filters)

      const filteredSatellites = Object.values(this.satellites)
        .filter(function(item) {
          for (var key in filters) {
            if (
              item.source1[key] === undefined ||
              !filters[key].includes(item.source1[key])
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
        .filter((sat) => sat.source1.countryOfLaunch === 'US')
        .map((sat) => sat.catalog_id)
      console.log(filteredSatellites)
      this.updateActiveSatellites(filteredSatellites)
    },
    resetFilters() {
      console.log('reset filters')
      const filteredSatellites = Object.keys(this.satellites)
      this.updateActiveSatellites(filteredSatellites)
    },
    nestedFilter(targetArray, filters) {
      var filterKeys = Object.keys(filters)
      return targetArray.filter(function(eachObj) {
        return filterKeys.every(function(eachKey) {
          if (!filters[eachKey].length) {
            return true
          }
          return filters[eachKey].includes(eachObj[eachKey])
        })
      })
    },
    ...mapMutations({
      updateActiveSatellites: 'satellites/updateActiveSatellites'
    })
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin: 2rem 0;
}
</style>
