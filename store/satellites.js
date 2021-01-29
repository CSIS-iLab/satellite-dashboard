import Types from '~/assets/data/types.json'

const siteURL = 'https://satdash.wpengine.com'
const siteURLLocal = 'http://satellite-dashboard.local/'

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

const statusTypes = {
  'payload-active': {
    label: 'Active Payload',
    color: 'rgba(233, 131, 40, 1)'
  },
  'payload-inactive': {
    label: 'Inactive Payload',
    color: 'rgba(200, 56, 16, 1)'
  },
  'rocket-body': {
    label: 'Rocket Body',
    color: 'rgba(226, 212, 135, 1)'
  },
  debris: {
    label: 'Debris',
    color: 'rgba(56, 183, 252, 1)'
  },
  TBA: {
    label: 'Uncategorized',
    color: 'rgba(44, 92, 125, 1)'
  }
}

export const state = () => ({
  satellites: {},
  orbits: {},
  activeSatellites: [],
  focusedSatellites: new Set(),
  detailedSatellite: null,
  targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
  selectedTimescale: timescales[1],
  timescales,
  statusTypes
})

export const getters = {
  activeSatellites: (state) => {
    return state.activeSatellites
  },
  activeSatellitesCount: (state, getters) => {
    return getters.activeSatellites.length
  },
  focusedSatellites: (state) => {
    return state.focusedSatellites
  },
  focusedSatellitesCount: (state, getters) => {
    return getters.focusedSatellites.size
  },
  detailedSatellite: (state) => {
    return state.detailedSatellite
  },
  statusTypesKeys: (state) => {
    return Object.keys(state.statusTypes)
  }
}

export const mutations = {
  updateSatellites: (state, satellites) => {
    state.satellites = satellites
  },
  updateOrbits: (state, orbits) => {
    state.orbits = orbits
  },
  updateTargetDate: (state, newTargetDate) => {
    state.targetDate = newTargetDate
  },
  updateSelectedTimescale: (state, selectedTimescale) => {
    state.selectedTimescale = selectedTimescale
  },
  updateActiveSatellites: (state, satellites) => {
    state.activeSatellites = satellites
  },
  updateFocusedSatellites: (state, satellites) => {
    state.focusedSatellites = satellites
  },
  updateDetailedSatellite: (state, satellite) => {
    state.detailedSatellite = satellite
  }
}

export const actions = {
  /**
   * Pulls Satellite from WordPress database and stores them in state so they can be filtered.
   */
  async getSatellites({ state, commit }) {
    try {
      let satellites = await fetch(
        `${siteURL}/wp-json/wp/v2/satellites?show_all=true`
      ).then((res) => res.json())

      let items = {}
      let activeItems = []

      /**
       * Todo:
       * Show manual overrides in ACF fields
       * Match type/status with spreadsheet
       * Match country with spreadsheet
       */

      console.log(Types['10000'])

      satellites = satellites
        .filter((el) => el.status === 'publish')
        .map(({ id, ag_meta, acf }) => ({
          post_id: id,
          catalog_id: acf.catalog_id,
          acf,
          ...ag_meta
        }))
        .forEach((sat) => {
          let status_type = Types[sat.acf.catalog_id]?.type || 'TBA'

          if (status_type == 'payload') {
            if (sat.Status == 'active') {
              status_type = `${status_type}-active`
            } else {
              status_type = `${status_type}-inactive`
            }
          }

          items[sat.acf.catalog_id] = {
            ...sat,
            Status: status_type
          }

          // By default all items are active!
          activeItems.push(sat.acf.catalog_id)
        })

      console.log('Get the satellites.')

      commit('updateSatellites', Object.freeze(items))
      commit('updateActiveSatellites', activeItems)
    } catch (err) {
      console.log(err)
    }
  },

  /**
   * Pulls Satellite Orbit Information from WordPress database. Pulls based on given date range.
   */
  async getOrbits({ state, commit }) {
    try {
      const endDate = new Date(state.targetDate)
      endDate.setSeconds(
        endDate.getSeconds() + state.selectedTimescale.value - 1
      ) // minus 1 second so we don't get n + 1 days

      let orbits = await fetch(
        `${siteURL}/wp-json/satdash/v1/satellites/orbits/?startDate=${getDateForApi(
          state.targetDate
        )}&endDate=${getDateForApi(endDate)}`
      ).then((res) => res.json())

      if (Array.isArray(orbits)) {
        return
      }

      // Todo: Modify active satellites here to trigger watch in CesiumViewer

      console.log('Get updated orbits.')
      commit('updateOrbits', Object.freeze(orbits))
    } catch (err) {
      console.log(err)
    }
  }
}
