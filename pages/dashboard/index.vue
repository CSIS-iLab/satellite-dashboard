<template>
  <Page title="Analysis">
    <div slot="header">
      <p class="page__desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat ornare
        dictum ut arcu diam morbi mi rutrum aliquet. Varius molestie eros
        scelerisque convallis ornare sociis fusce mauris. Vitae ut etiam purus
        in mattis tristique feugiat tellus lacinia.
      </p>
    </div>
    <div>
      <template v-if="loading">
        Loading...
      </template>

      <template v-else>
        <table style="color: #fff;">
          <thead>
            <tr>
              <td>Name</td>
              <td>Latest Orbital Data</td>
            </tr>
          </thead>
          <tr v-for="sat in satellites" :key="sat.id">
            <td>{{ sat.id }}</td>
            <td></td>
          </tr>
        </table>
      </template>
    </div>
  </Page>
</template>

<script>
import Page from '~/layout/page'
// import { API, graphqlOperation } from 'aws-amplify'
// import * as queries from '@/src/custom-graphql/queries'

export default {
  layout: 'layout',
  components: {
    Page
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    satellites() {
      return this.$store.state.satellites.satellites
    }
  },
  created() {
    this.$store.dispatch('satellites/getSatellites')
    this.loading = false
  }
  // created() {
  //   this.getSatellites()
  // },
  // methods: {
  //   async getSatellites() {
  //     // reset loading just in case
  //     this.loading = true
  //     let nextToken
  //     while (nextToken !== null) {
  //       let { data } = await API.graphql(
  //         graphqlOperation(queries.allSatellitesToday, { limit: 5000 })
  //       )
  //       this.satellites = this.satellites.concat(data.listSatellites.items)
  //       nextToken = data.listSatellites.nextToken
  //     }
  //     this.loading = false
  //   }
  // }
}
</script>

<style lang="scss">
@import '../assets/css/pages/dashboard';
</style>
