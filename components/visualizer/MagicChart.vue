<template>
  <Modal
    class="magic-chart"
    @close="updateMagicChart({ showMagicChart: false })"
  >
    <template v-slot:header> Compare Objects </template>
    <template v-slot:body>
      <div v-if="dataLoaded">
        <highcharts
          ref="chart"
          key="chart"
          :constructor-type="'stockChart'"
          :options="chartOptions"
          class="magic-chart"
        />
        <div class="data-sources">
          <h4 class="data-source-title">Data Sources</h4>
          <ul class="modal__footer-data-source" role="list">
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
      </div>
      <div v-else class="magic-chart">Loading satellite data...</div>
    </template>
    <template v-slot:footer>
      <div v-if="dataLoaded" class="export-btns">
        <Button
          id="printer"
          class="btn btn--contained export-btns--print"
          @click="() => exportImg('application/pdf')"
        >
          <Icon class="icon" name="printer" />
          Print
        </Button>
        <div class="export-btns__download">
          <span class="export-btns__label">Download</span>
          <Button class="btn btn--contained" @click="exportCSV">CSV</Button>
          <Button
            class="btn btn--contained"
            @click="() => exportImg('image/jpeg')"
            >JPG</Button
          >
          <Button
            class="btn btn--contained"
            @click="() => exportImg('image/svg+xml')"
            >SVG</Button
          >
        </div>
      </div>
      <div v-else purpose="div here to occupy footer while chart loads"></div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import Modal from '~/components/global/Modal'
import Icon from '~/components/global/Icon'

export default {
  components: {
    Modal,
    Icon
  },
  data() {
    return {
      dataLoaded: false,
      sourceInfo: [],
      chartOptions: {
        title: { text: 'Historical Longitudes' },
        chart: {
          styledMode: true,
          height: '85%',
          events: {}
        },
        plotOptions: {
          turboThreshold: 15000,
          series: { showInNavigator: true }
        },
        exporting: {
          enabled: false,
          allowHTML: true,
          sourceWidth: 600,
          sourceHeight: 400,
          chartOptions: {
            chart: {
              height: null,
              spacing: [10, 10, 15, 10],
              events: {
                load: function() {
                  this.container.classList.add('highchart-export')
                },
                render: function() {
                  this.renderer
                    .image(
                      'https://satellitedashboard.org/satellite-dashboard-logo-black.svg',
                      395,
                      375,
                      200,
                      19
                    )
                    .add()
                }
              }
            },
            rangeSelector: {
              enabled: false
            },
            navigator: {
              enabled: false
            }
          }
        },
        credits: { enabled: false },
        legend: {
          enabled: true,
          labelFormatter: function() {
            return `${this.name}<br /><span class="legend-id">${this.options.catalog_id}</span>`
          }
        },
        xAxis: { title: null },
        yAxis: {
          opposite: false,
          title: { text: 'Longitude', margin: 10 },
          labels: {
            formatter: (label) =>
              `${Math.abs(label.value)}°${label.value < 0 ? 'W' : 'E'}`
          }
        },
        tooltip: {
          formatter: function() {
            return this.points
              .map((point, i) => {
                point.color =
                  i % 2 ? 'rgba(82, 175, 225, 1)' : 'rgba(254, 116, 20,1)'
                return point
              })
              .sort((a, b) => a.y < b.y)
              .reduce(
                function(arr, point, i) {
                  arr.push(`<span class="tooltip-line-color" style="color: ${
                    point.color
                  }">–</span><span class="tooltip-y">
                  ${Math.abs(point.y).toFixed(2)}°${
                    point.y < 0 ? 'W' : 'E'
                  }</span>`)
                  return arr
                },
                [
                  `<b>
                    ${new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      day: 'numeric',
                      month: 'short'
                    }).format(new Date(this.x))}
                    </b>`
                ]
              )
              .join('<br />')
          },
          split: false,
          shared: true
        },
        navigator: {
          adaptToUpdatedData: true,
          margin: 0,
          // not working
          maskInside: false
        },
        scrollbar: {
          enabled: false
        },
        rangeSelector: {
          inputEnabled: false,
          allButtonsEnabled: false,
          buttons: [
            {
              type: 'week',
              count: 1,
              text: 'Week',
              title: 'View last week'
            },
            {
              type: 'month',
              count: 1,
              text: 'Month',
              title: 'View last month'
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
      showMagicChart: (state) => state.layout.showMagicChart,
      zoom: (state) => state.satellites.longitudeSatellites.zoom
    })
  },
  async created() {
    await this.longitudes()
  },
  methods: {
    exportCSV() {
      this.$refs.chart.chart.downloadCSV()
    },
    exportImg(type) {
      this.$refs.chart.chart.exportChart({
        type,
        async: false
      })
    },
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

      // add predicted values to normalize charting
      if (!predicted_longitudes.length) {
        predicted_longitudes = historical_longitudes.map((l) => ({
          ...l,
          data: l.data.slice(l.data.length - 1)
        }))
      }

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
            label: {
              text: 'Today',
              verticalAlign: 'top',
              rotation: 0,
              x: -20,
              y: -10
            }
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

      if (this.zoom == '1wk') {
        this.chartOptions.chart.events.load = function() {
          // set zoom to last week
          const xAxis = this.xAxis[0]
          const oneWeekAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 7
          const start = this.series[0].xData.find((i) => i > oneWeekAgo)
          const end = this.series[0].xData.slice(-1)[0]
          xAxis.setExtremes(start, end)
        }
      }
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
@import '~/assets/css/components/magic-chart';
</style>
