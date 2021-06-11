<template>
  <Modal @close="updateMagicChart({ showMagicChart: false })">
    <template v-slot:header>Comparing Orbits</template>
    <template v-slot:body>
      <highcharts
        ref="chart"
        :constructor-type="'stockChart'"
        class="hc"
        :options="options"
      />
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
      options: {
        title: { text: 'Historical Longitudes' },
        series: [
          {
            data: [
              [1000000, 1],
              [2000000, 2],
              [3000000000, 5],
              [300000000000, 15],
              [900000000000, 5]
            ]
          },
          {
            data: [
              [1000000, 1],
              [2000000, 4],
              [3000000000, 1],
              [300000000000, 5],
              [900000000000, 25]
            ]
          }
        ],
        xAxis: 'datetime',
        yAxis: {
          title: { text: 'longitude' }
        }
      }
    }
  },
  computed: {
    ...mapState({
      showMagicChart: (state) => state.layout.showMagicChart
    })
  },
  methods: {
    makeMagicChart() {},
    ...mapMutations({
      updateMagicChart: 'layout/updateMagicChart'
    })
  }
}
</script>

<style lang="scss">
.hc {
  min-width: 40vw;
}
</style>
