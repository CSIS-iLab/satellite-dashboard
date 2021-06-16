<template>
  <Modal @close="updateMagicChart({ showMagicChart: false })">
    <template v-slot:header>
      Comparing Orbits
      <Button
        type="button"
        class="modal__btn-close-icon"
        aria-label="Close Modal"
        :on-click="close"
      >
        <Icon id="close-small" name="close-small" focusable="false" />
      </Button>
    </template>
    <template v-slot:body>
      <highcharts
        ref="chart"
        :constructor-type="'stockChart'"
        class="hc magic-chart"
        :options="chartOptions"
      />
    </template>
    <template v-slot:footer>
      <div></div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Modal from '~/components/global/Modal'

export default {
  components: {
    Modal
  },

  data() {
    return {
      chartOptions: {
        title: { text: 'Historical Longitudes' },
        legend: { enabled: true },
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
        series: [
          {
            name: 'Sat 1',
            data: [
              [1000000, 1],
              [2000000, 2],
              [3000000000, 5],
              [300000000000, 15],
              [900000000000, 5]
            ]
          },
          {
            name: 'Sat 2',
            data: [
              [1000000, 1],
              [2000000, 4],
              [3000000000, 1],
              [300000000000, 5],
              [900000000000, 25]
            ]
          }
        ],
        xAxis: { title: { text: 'Datetime' } },
        yAxis: { title: { text: 'Longitude' } },
        chart: { styledMode: true }
      }
    }
  },
  computed: {
    ...mapState({
      showMagicChart: (state) => state.layout.showMagicChart
    })
  },
  methods: {
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
