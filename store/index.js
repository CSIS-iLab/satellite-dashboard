export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('satellites/getSatellites')
  }
}
