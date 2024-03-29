import qs from 'querystring'

import Types from '~/assets/data/types.json'
import AGCountries from '~/assets/data/ag_countries.json'
import CountryISOs from '~/assets/data/country_isos.json'
import Orbitals from '../services/orbitals'
import timeEventsProvider from '../services/time-events'
const timeEvents = timeEventsProvider()

const padNumber = (num) => {
  return num.toString().padStart(2, 0)
}

const oneDay = 24 * 60 * 60
const oneWeek = 7 * oneDay
const oneMonth = oneWeek * 4

const timescales = [
  {
    id: 'day',
    label: 'Day',
    value: oneDay
  },
  {
    id: 'week',
    label: 'Week',
    value: oneWeek
  },
  {
    id: 'month',
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

const getResettableDefaultState = () => {
  return {
    orbits: {},
    filteredSatellites: [],
    focusedSatellites: new Set(),
    visibleSatellites: [],
    visibleSatellitesType: 'catalog',
    detailedSatellite: null,
    targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
    selectedTimescale: timescales[1]
  }
}

export const state = () => ({
  satellites: {},
  longitudeSatellites: [],
  countriesOfLaunch: [],
  timescales,
  statusTypes,
  ITUData: [],
  ...getResettableDefaultState()
})

export const getters = {
  satelliteCatalogIds: (state) => {
    return Object.keys(state.satellites)
  },
  filteredSatellitesCount: (state) => {
    return state.filteredSatellites.length
  },
  focusedSatellitesCount: (state) => {
    return state.focusedSatellites.size
  },
  statusTypesKeys: (state) => {
    return Object.keys(state.statusTypes)
  },
  ITUDataNearLongitude: (state) => (longitude) => {
    // filter rows within +/- 0.5 longitude from target
    const upper = longitude + 0.5
    const lower = longitude - 0.5
    const absLong = Math.abs(longitude)
    const filtered = state.ITUData.filter((datum) => {
      return datum.longitude <= upper && datum.longitude >= lower
    }).sort((a, b) => {
      // compare absolute diffs to get ascending dist from original longitude
      const diffA = Math.abs(Math.abs(a.longitude) - absLong)
      const diffB = Math.abs(Math.abs(b.longitude) - absLong)
      return diffA - diffB
    })

    if (!filtered.length) return []

    // return closest vals
    const closest = filtered[0]
    return filtered.filter((row) => row.longitude === closest.longitude)
  }
}

export const mutations = {
  resetSatellitesState: (state) => {
    const items = getResettableDefaultState()
    Object.keys(items).forEach((key) => {
      state[key] = items[key]
    })
  },
  updateSatellites: (state, satellites) => {
    state.satellites = satellites
  },
  updateOrbits: (state, orbits) => {
    state.orbits = orbits
  },
  updateTargetDate: (state, newTargetDate) => {
    state.targetDate = newTargetDate
    timeEvents.init(newTargetDate)
  },
  updateSelectedTimescale: (state, selectedTimescale) => {
    state.selectedTimescale = selectedTimescale
  },
  updateFilteredSatellites: (state, satellites) => {
    state.filteredSatellites = satellites
  },
  updateFocusedSatellites: (state, satellites) => {
    state.focusedSatellites = satellites
  },
  updateDetailedSatellite: (state, satellite) => {
    state.detailedSatellite = satellite
  },
  updateVisibleSatellites: (state, satellites) => {
    state.visibleSatellites = satellites
  },
  updateVisibleSatellitesType: (state, type) => {
    state.visibleSatellitesType = type
  },
  updateLongitudeSatellites: (state, payload) => {
    state.longitudeSatellites = payload
  },
  updateCountriesOfLaunch: (state, countries) => {
    state.countriesOfLaunch = countries
  },
  updateITUData: (state, ituData) => {
    state.ITUData = ituData
  }
}

export const actions = {
  /**
   * Pulls Satellite from WordPress database and stores them in state so they can be filtered.
   */
  async getSatellites({ state, commit }) {
    if (Object.keys(state.satellites).length) return

    try {
      const url = '/wp-json/wp/v2/satellites?count=250'

      // Get first page of results & return headers with total pages of satellite objects
      const firstPage = await this.$axios.get(`${url}&page=1`).then((res) => ({
        totalPages: +res.headers['x-wp-totalpages'],
        data: res.data
      }))

      // Get the remaining satellites' data by fetching each additional page.
      let requestURLs = []
      for (let i = 2; i <= firstPage.totalPages; i++) {
        requestURLs.push(this.$axios.get(`${url}&page=${i}`))
      }

      let satellites = await Promise.all(requestURLs)

      satellites = satellites
        .map((request) => request.data)
        .flat()
        .concat(firstPage.data)
      // console.log(satellites)

      // Organize Satellite Data
      let items = {}
      let visibleItems = []
      let countries = new Set()
      let countriesOfLaunch = new Set()

      /**
       * Todo:
       * Dynamically load in status & country spreadsheets
       */

      satellites = satellites
        .filter((el) => {
          return el && el.status === 'publish'
        })
        .map(({ id, ag_meta, acf }) => ({
          post_id: id,
          catalog_id: acf.catalog_id,
          ...ag_meta,
          alternate_name: acf.name,
          comments: acf.comments
        }))
        .forEach((sat) => {
          let status_type = Types[sat.catalog_id]?.type || 'TBA'

          if (status_type == 'payload') {
            if (sat.Status == 'active') {
              status_type = `${status_type}-active`
            } else {
              status_type = `${status_type}-inactive`
            }
          }

          // Format country names into standard codes if we can.
          if (!sat.countryOfLaunch) {
            sat.countryOfLaunch = 'TBD'
          }

          let countryOfLaunch = formatCountries(sat.countryOfLaunch)
          let countryOfLaunchIds = countryOfLaunch.map((d) => d.id)

          // Store the countryOfLaunch so we can filter on it later.
          countryOfLaunch.forEach((country) => {
            if (countries.has(country.id)) {
              return
            }
            countries.add(country.id)
            countriesOfLaunch.add({
              value: country.id,
              label: country.label
            })
          })

          items[sat.catalog_id] = {
            ...sat,
            countryOfLaunch,
            countryOfLaunchIds,
            Status: status_type
          }

          // By default all items are visible!
          visibleItems.push(sat.catalog_id)
        })

      countriesOfLaunch = [...countriesOfLaunch].sort((a, b) =>
        a.label.localeCompare(b.label)
      )

      commit('updateSatellites', Object.freeze(items))
      commit('updateVisibleSatellites', visibleItems)
      commit('updateCountriesOfLaunch', Object.freeze(countriesOfLaunch))
    } catch (err) {
      console.error(err)
    }
  },

  /**
   * Pulls Satellite Orbit Information from WordPress database. Pulls based on given date range.
   */
  async getOrbits({ state, commit }, payload) {
    if (payload && payload.date) {
      const date = new Date(payload.date)
      commit('updateTargetDate', new Date(date.toISOString().slice(0, -1)))
    }
    try {
      const endDate = new Date(state.targetDate)
      endDate.setSeconds(
        endDate.getSeconds() + state.selectedTimescale.value - 1
      ) // minus 1 second so we don't get n + 1 days

      let orbits = await this.$axios.$get(
        `/wp-json/satdash/v1/satellites/orbits/?startDate=${getDateForApi(
          state.targetDate
        )}&endDate=${getDateForApi(endDate)}`
      )

      if (Array.isArray(orbits)) {
        return
      }

      if (typeof orbits === 'string') {
        orbits = JSON.parse(orbits)
      }

      // Todo: Modify active satellites here to trigger watch in CesiumViewer

      // iterate over orbits and pad elements to match number of days
      const numDays = state.selectedTimescale.value / oneDay
      Object.keys(orbits).forEach((key) => {
        const orbit = orbits[key]
        if (orbit.orbits && orbit.orbits.length < numDays) {
          // pad the orbits
          orbit.orbits = Orbitals.PadOrbitals(
            orbit.orbits,
            state.targetDate,
            numDays
          )
        }
      })
      commit('updateOrbits', Object.freeze(orbits))
    } catch (err) {
      console.log(err)
    }
  },

  /**
   *  Pulls historical and predicted orbital longitudes for requested satellites
   * */
  async getLongitudes({ state, commit }, { _ids }) {
    // php server only recognizes bracket encoding for arrays
    const ids = qs.encode(
      { ids: _ids || state.longitudeSatellites.ids },
      '&',
      '[]='
    )

    let historical_longitudes, predicted_longitudes
    try {
      ;[historical_longitudes, predicted_longitudes] = await Promise.all([
        this.$axios.$get(`wp-json/satdash/v1/longitudes/historical?${ids}`),
        this.$axios.$get(`wp-json/satdash/v1/longitudes/predicted?${ids}`)
      ])
    } catch (e) {
      // TODO: handle error case with notification and canceling charting fns
      console.error(e)
    }

    return {
      historical_longitudes,
      predicted_longitudes
    }
  },

  async getITUData({ commit }) {
    let ituData
    try {
      ituData = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyAhdaS0Ria8o0LNxjBKrEEd5JX4lx6ZqBw9yPpGTue62co4OS4Js7rm6ZFIQBoYs6Jj9_X08oQ9lm/pub?output=tsv'
      )
    } catch (e) {
      console.error(e)
    }
    if (!ituData.ok) {
      console.error('error fetching ITU data')
      return
    }
    ituData = await ituData.text()
    ituData = ituData.split('\n').map((row) => {
      const [longitude, country, bands, link] = row.split('\t').slice(0, 4)
      return {
        longitude,
        country,
        bands,
        link
      }
    })

    commit('updateITUData', ituData)
  }
}

function formatCountries(value) {
  if (value === undefined) {
    value = ''
  }
  let countryID = value != undefined ? value : 'TBD'

  let iso = AGCountries[value] || value
  let options = iso.split('/').map((d) => d.trim())
  let countries = options.map((option) => ({
    countryID: countryID,
    id: option,
    label: CountryISOs[option] || option
  }))

  return countries
}
