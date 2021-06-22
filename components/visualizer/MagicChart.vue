<template>
  <Modal @close="updateMagicChart({ showMagicChart: false })">
    <template v-slot:header>
      Comparing Orbits
    </template>
    <template v-slot:body>
      <highcharts
        v-if="dataLoaded"
        ref="chart"
        :constructor-type="'stockChart'"
        class="hc magic-chart"
        :options="chartOptions"
      />
      <div v-else>Loading satellite data...</div>
    </template>
    <template v-slot:footer>
      <div></div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import Modal from '~/components/global/Modal'

export default {
  components: {
    Modal
  },

  data() {
    return {
      dataLoaded: false,
      chartOptions: {
        title: { text: 'Historical Longitudes' },
        chart: { styledMode: true },
        plotOptions: {
          turboThreshold: 15000
        },
        legend: { enabled: true },
        xAxis: { title: { text: 'Datetime' } },
        yAxis: { opposite: false, title: { text: 'Longitude' } },
        rangeSelector: {
          inputEnabled: true,
          allButtonsEnabled: false,
          buttons: [
            {
              type: 'ytd',
              text: 'YTD',
              title: 'View year to date'
            },
            {
              type: 'year',
              count: 1,
              text: '1y',
              title: 'View 1 year'
            },
            {
              type: 'all',
              text: 'All',
              title: 'View all'
            }
          ]
        },
        series: []
      }
    }
  },
  computed: {
    ...mapState({
      showMagicChart: (state) => state.layout.showMagicChart
    })
  },
  async created() {
    await this.longitudes()
  },
  methods: {
    async longitudes() {
      const {
        names,
        historical_longitudes,
        predicted_longitudes
      } = await this.getLongitudes({ _ids: null })

      // set historical lines
      historical_longitudes.forEach((l, i) => {
        this.chartOptions.series[i] = { data: historical_longitudes[i].data }
        this.chartOptions.series[i].name = `${names[i]}`
      })

      // set predicted lines
      predicted_longitudes.forEach((l, i) => {
        this.chartOptions.series[i + historical_longitudes.length - 1] = {
          data: predicted_longitudes[i].data
        }
        this.chartOptions.series[
          i + historical_longitudes.length - 1
        ].name = `${names[i]} (predicted)`
      })

      // add vertical line for today
      if (predicted_longitudes.length) {
        this.chartOptions.xAxis.plotLines = [
          {
            width: 2,
            value: new Date().getTime(),
            label: { text: 'Today' }
          }
        ]
      }

      // render chart after data is loaded
      this.dataLoaded = true
    },
    ...mapActions({
      getLongitudes: 'satellites/getLongitudes'
    }),
    ...mapMutations({
      updateMagicChart: 'layout/updateMagicChart'
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/components/highcharts-theme';
@import '~/assets/css/components/magic-chart';
</style>
