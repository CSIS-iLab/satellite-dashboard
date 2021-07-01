import Vue from 'vue'

import Highcharts from 'highcharts'

import Stock from 'highcharts/modules/stock'

import boost from 'highcharts/modules/boost'
import exportingInit from 'highcharts/modules/exporting'
// server side rendering makes this tricky
// see https://github.com/highcharts/highcharts/issues/10588
if (typeof Highcharts === 'object') {
  boost(Highcharts)
  exportingInit(Highcharts)
}

import HighchartsVue from 'highcharts-vue'
Stock(Highcharts)
Vue.use(HighchartsVue)
