const siteURL = 'https://satdash.wpengine.com'

export const state = () => ({
  satellites: []
})

export const mutations = {
  updateSatellites: (state, satellites) => {
    state.satellites = satellites
  }
}

export const actions = {
  /**
   * Pulls Satellite from WordPress database and stores them in state so they can be filtered.
   */
  async getSatellites({ state, commit }) {
    if (state.satellites.length) return

    try {
      let satellites = await fetch(
        `${siteURL}/wp-json/satdash/v1/satellites`
      ).then((res) => res.json())

      commit('updateSatellites', satellites)
    } catch (err) {
      console.log(err)
    }
  }
}
