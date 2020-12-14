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
  satellites: {},
  activeSatellites: [],
  targetDate: new Date()
  // countriesOfJurisdiction: null,
  // countriesOfLaunch: null
})

export const getters = {
  activeSatellites: (state) => {
    return state.activeSatellites
  },
  activeSatellitesCount: (state, getters) => {
    return getters.activeSatellites.length
  }
}

export const mutations = {
  updateSatellites: (state, satellites) => {
    state.satellites = satellites
  },
  updateTargetDate: (state, newTargetDate) => {
    state.targetDate = newTargetDate
  },
  updateActiveSatellites: (state, satellites) => {
    state.activeSatellites = satellites
  }
  // updateCountries: (state, countries) => {
  //   state.countriesOfJurisdiction = countries.jurisdiction
  //   state.countriesOfLaunch = countries.launch
  // }
}

export const actions = {
  /**
   * Pulls Satellite from WordPress database and stores them in state so they can be filtered.
   */
  async getSatellites({ state, commit }) {
    try {
      let satellites = await fetch(
        `${siteURL}/wp-json/satdash/v1/satellites?date=${getDateForApi(
          state.targetDate
        )}`
      ).then((res) => res.json())

      let items = {}
      let activeItems = []
      // let countries = {
      //   jurisdiction: new Set(),
      //   launch: new Set()
      // }

      // TODO: Update API to return object keyed by ID instead of doing it here.
      satellites.forEach((sat) => {
        items[sat.catalog_id] = sat
        activeItems.push(sat.catalog_id)
        sat.meta = { ...sat.source1, ...sat.source2 }
        // countries.jurisdiction.add({
        //   value: sat.source2.countryOfJurisdiction,
        //   label: sat.source2.countryOfJurisdiction
        // })
        // countries.launch.add({
        //   value: sat.source1.countryOfLaunch,
        //   label: sat.source1.countryOfLaunch
        // })
      })

      commit('updateSatellites', items)
      commit('updateActiveSatellites', activeItems)
      // commit('updateCountries', countries)
    } catch (err) {
      console.log(err)
    }
  }
}
