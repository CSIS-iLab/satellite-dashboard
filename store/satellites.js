const siteURL = 'https://satdash.wpengine.com'

const padNumber = (num) => {
  return num.toString().padStart(2, 0)
}

const oneDay = 24 * 60 * 60
const oneWeek = 7 * oneDay
const oneMonth = oneWeek * 4

const timescales = [
  {
    label: 'Day',
    value: oneDay
  },
  {
    label: 'Week',
    value: oneWeek
  },
  {
    label: 'Month',
    value: oneMonth
  }
]

const getDateForApi = (targetDate) => {
  return `${padNumber(targetDate.getFullYear())}-${padNumber(
    targetDate.getMonth() + 1
  )}-${padNumber(targetDate.getDate())}`
}

export const state = () => ({
  satellites: {},
  activeSatellites: [],
  targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
  selectedTimescale: timescales[0],
  timescales
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
  updateSelectedTimescale: (state, selectedTimescale) => {
    state.selectedTimescale = selectedTimescale
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
      const endDate = new Date(state.targetDate)
      endDate.setSeconds(
        endDate.getSeconds() + state.selectedTimescale.value - 1
      ) // minus 1 second so we don't get n + 1 days
      let satellites = await fetch(
        `${siteURL}/wp-json/satdash/v1/satellites?startDate=${getDateForApi(
          state.targetDate
        )}&endDate=${getDateForApi(endDate)}`
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
