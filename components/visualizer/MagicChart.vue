<template>
  <Modal @close="updateMagicChart({ showMagicChart: false })">
    <template v-slot:header> <h3>Compare Orbits</h3> </template>
    <template v-slot:body>
      <highcharts
        v-if="dataLoaded"
        ref="chart"
        :constructor-type="'stockChart'"
        :options="chartOptions"
        class="hc magic-chart"
      />
      <div v-else>Loading satellite data...</div>
    </template>
    <template v-slot:footer>
      <div v-if="dataLoaded">
        <h4>Data Sources</h4>
        <ul class="modal__footer-data-source">
          <li v-for="source in sourceInfo" :key="source.sat_id">
            <span class="data-source--sat-name">{{ source.sat_name }}:</span>
            <span class="data-source--source-name">
              {{ source.source_name }}
            </span>
            <span class="data-source-time"
              >(last updated {{ source.source_last_updated }})</span
            >
          </li>
        </ul>
      </div>
      <div v-else purpose="div here to occupy footer while chart loads"></div>
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
      sourceInfo: [],
      chartOptions: {
        title: { text: 'Historical Longitudes' },
        chart: { styledMode: true },
        plotOptions: {
          turboThreshold: 15000,
          series: {
            showInNavigator: true
          }
        },
        credits: { enabled: false },
        legend: { enabled: true },
        xAxis: { title: null },
        yAxis: {
          opposite: false,
          title: { text: 'Longitude' },
          labels: { format: '{value}°' }
        },
        tooltip: {
          formatter: function() {
            return this.points.reduce(
              function(s, point, i) {
                return `${s}<span class="tooltip-line-color" style="color: ${
                  i ? 'rgba(254, 116, 20,1)' : 'rgba(82, 175, 225, 1)'
                }">–</span><span class="tooltip-y">
                  ${point.y.toFixed(2)}°</span>`
              },
              '<b>' +
                new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  day: 'numeric',
                  month: 'short'
                }).format(new Date(this.x)) +
                '</b>' +
                '<br/>'
            )
          },
          split: false,
          shared: true
        },
        navigator: {
          height: 75,
          // not working
          maskInside: false
        },
        scrollbar: {
          enabled: false
        },
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
        l.name = names[i]

        this.chartOptions.series.push(l)
        return l
      })

      // shape predicted lines
      predicted_longitudes = predicted_longitudes.map((l, i) => {
        l.showInLegend = false

        // add last historical point to beginning of predicted
        l.data.unshift(
          historical_longitudes[i].data[
            historical_longitudes[i].data.length - 1
          ]
        )

        this.chartOptions.series.push(l)
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

      // add source info to data()
      this.sourceInfo = historical_longitudes.map((l, i) => {
        return {
          sat_id: l.catalog_id,
          sat_name: names[i],
          source_name: l.source_name,
          source_last_updated: l.source_last_updated
        }
      })

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
