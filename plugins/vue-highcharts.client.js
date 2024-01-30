import Vue from 'vue'

import Highcharts from 'highcharts'

import Stock from 'highcharts/modules/stock'

import boost from 'highcharts/modules/boost'
import exportingInit from 'highcharts/modules/exporting'
import exportingDataInit from 'highcharts/modules/export-data'
// server side rendering makes this tricky
// see https://github.com/highcharts/highcharts/issues/10588
if (typeof Highcharts === 'object') {
  boost(Highcharts)
  exportingInit(Highcharts)
  exportingDataInit(Highcharts)
}

import HighchartsVue from 'highcharts-vue'
Stock(Highcharts)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HighchartsVue)
})
