<template>
  <div>
    <h2>{{ numFiltersApplied }} filters</h2>
    <p v-show="numFiltersApplied == 0">
      Please apply at least one filter to view results.
    </p>
    <button @click="applyFilter">Apply Filter</button>
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
  computed: {
    numFiltersApplied() {
      return 0
    },
    // numResults() {
    //   return this.activeSatellitesCount()
    // },
    satellites() {
      return this.$store.state.satellites.satellites
    },
    ...mapGetters({
      activeSatellites: 'satellites/activeSatellites',
      numSatellites: 'satellites/activeSatellitesCount'
    })
  },
  methods: {
    applyFilter() {
      console.log('apply the filter!')
      let filters = {
        countryOfLaunch: 'US'
      }

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
    ...mapMutations({
      updateActiveSatellites: 'satellites/updateActiveSatellites'
    })
  }
}
</script>
