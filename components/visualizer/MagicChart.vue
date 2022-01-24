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
              <span class="data-source-time">
                (last updated {{ source.source_last_updated }})
              </span>
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
          events: {
            load: function() {
              let logoExist = false
            },
            render: function() {
              const chart = this
              const logo =
                'data:image/png;base64,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'
              if (!this.logoExist) {
                chart.renderer
                  .image(logo, 395, 68, 200, 19)
                  .attr({
                    opacity: 0.4
                  })
                  .add()
                this.logoExist = true
              }
            }
          }
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
                      'data:image/png;base64,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',
                      395,
                      375,
                      200,
                      19
                    )
                    .attr({
                      opacity: 0.2
                    })
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
              .sort((a, b) => b.y - a.y)
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
        historical_longitudes,
        predicted_longitudes
      } = await this.getLongitudes({ _ids: null })

      // shape historical lines
      historical_longitudes = historical_longitudes.map((l, i) => {
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
          sat_name: l.name,
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
