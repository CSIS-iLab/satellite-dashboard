const siteURL = 'https://satdash.wpengine.com'

const padNumber = (num) => {
  return num.toString().padStart(2, 0)
}

const getDateForApi = (targetDate) => {
  const hour = targetDate.getHours()
  if (hour < 12) {
    return `${padNumber(targetDate.getFullYear())}-${padNumber(
      targetDate.getMonth() + 1
    )}-${padNumber(targetDate.getDate())}`
  } else {
    return `${padNumber(targetDate.getFullYear())}-${padNumber(
      targetDate.getMonth() + 1
    )}-${padNumber(targetDate.getDate() + 1)}`
  }
}

export const state = () => ({
  satellites: [],
  targetDate: getDateForApi(new Date())
})

export const mutations = {
  updateSatellites: (state, satellites) => {
    state.satellites = satellites
  },
  updateTargetDate: (state, newTargetDate) => {
    state.targetDate = getDateForApi(newTargetDate)
  }
}

export const actions = {
  /**
   * Pulls Satellite from WordPress database and stores them in state so they can be filtered.
   */
  async getSatellites({ state, commit }) {
    try {
      let satellites = await fetch(
        `${siteURL}/wp-json/satdash/v1/satellites?date=${state.targetDate}`
      ).then((res) => res.json())

      commit('updateSatellites', satellites)
    } catch (err) {
      console.log(err)
    }
  }
}
