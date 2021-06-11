export const state = () => ({
  showMagicChart: false
})

export const mutations = {
  updateMagicChart: (state, { magicChartState }) => {
    state.showMagicChart = magicChartState
  }
}
