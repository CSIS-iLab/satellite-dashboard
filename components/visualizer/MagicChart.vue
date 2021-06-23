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
        :options="chartOptions"
        :callback="chartCallback"
        class="hc magic-chart"
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
      let {
        names,
        historical_longitudes,
        predicted_longitudes
      } = await this.getLongitudes({ _ids: null })

      // shape historical lines
      historical_longitudes = historical_longitudes.map((l, i) => {
        // TODO remove this sort after merging backend fix
        l.data = l.data.sort((a, b) => {
          return a[0] - b[0]
        })

        l.name = names[i]

        return l
      })

      // shape predicted lines
      predicted_longitudes = predicted_longitudes.map((l, i) => {
        // TODO remove this sort after merging backend fix
        l.data = l.data.sort((a, b) => {
          return a[0] - b[0]
        })

        l.name = `${names[i]} (predicted)`

        // add last historical point to beginning of predicted
        l.data.unshift(
          historical_longitudes[i].data[
            historical_longitudes[i].data.length - 1
          ]
        )

        return l
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

      // TODO set css on series length basis the first chart can have up to 4
      // lines, the smaller chart has up to 4. If the first chart only has 2
      // lines (i.e. no predictions), the second chart needs to set the
      // `highcharts-series-2,3` classes to be solid , If there are 4 separate
      // series (2 historical solid, 2 predicted dashed), then
      // `highcharts-series-2,3` need to be dashed and  `highcharts-series-4-7`
      // need to be solid

      // set chartCallback to get all lines in both charts
      this.chartCallback = function(chart) {
        console.log('callback')
        ;[...historical_longitudes, ...predicted_longitudes].forEach(
          (series) => {
            chart.addSeries(series)
          }
        )
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
