import Types from '~/assets/data/types.json'
import AGCountries from '~/assets/data/ag_countries.json'
import CountryISOs from '~/assets/data/country_isos.json'
import Orbitals from '../services/orbitals'
import timeEventsProvider from '../services/time-events'
const timeEvents = timeEventsProvider()

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

export const state = () => ({
  satellites: {},
  orbits: {},
  filteredSatellites: [],
  focusedSatellites: new Set(),
  visibleSatellites: [],
  visibleSatellitesType: 'catalog',
  detailedSatellite: null,
  targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
  selectedTimescale: timescales[1],
  timescales,
  statusTypes,
  countriesOfJurisdiction: []
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
  updateCountriesOfJurisdiction: (state, countries) => {
    state.countriesOfJurisdiction = countries
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
        requestURLs.push(`${siteURL}${url}&page=${i}`)
      }

      let satellites = await fetchAll(requestURLs)

      satellites = satellites
        .map((request) => request.data)
        .flat()
        .concat(firstPage.data)
      // console.log(satellites)

      // Organize Satellite Data
      let items = {}
      let visibleItems = []
      let countries = new Set()
      let countriesOfJurisdiction = new Set()

      /**
       * Todo:
       * Show manual overrides in ACF fields
       * Match country with spreadsheet
       * Dynamically load in status & country spreadsheets
       */

      satellites = satellites
        .filter((el) => {
          return el && el.status === 'publish'
        })
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

          // Format country names into standard codes if we can.
          if (!sat.countryOfJurisdiction) {
            sat.countryOfJurisdiction = 'TBD'
          }

          let countryOfJurisdiction = formatCountries(sat.countryOfJurisdiction)
          let countryOfJurisdictionIds = countryOfJurisdiction.map((d) => d.id)

          let countryOfLaunch = formatCountries(sat.countryOfLaunch)

          // Store the countryOfJurisdiction so we can filter on it later.
          countryOfJurisdiction.forEach((country) => {
            if (countries.has(country.id)) {
              return
            }
            countries.add(country.id)
            countriesOfJurisdiction.add({
              value: country.id,
              label: country.label
            })
          })

          items[sat.acf.catalog_id] = {
            ...sat,
            countryOfJurisdiction,
            countryOfLaunch,
            countryOfJurisdictionIds,
            Status: status_type
          }

          // By default all items are visible!
          visibleItems.push(sat.acf.catalog_id)
        })

      countriesOfJurisdiction = [...countriesOfJurisdiction].sort((a, b) =>
        a.label.localeCompare(b.label)
      )

      commit('updateSatellites', Object.freeze(items))
      commit('updateVisibleSatellites', visibleItems)
      commit(
        'updateCountriesOfJurisdiction',
        Object.freeze(countriesOfJurisdiction)
      )
    } catch (err) {
      console.log(err)
    }
  },

  /**
   * Pulls Satellite Orbit Information from WordPress database. Pulls based on given date range.
   */
  async getOrbits({ state, commit }, payload) {
    if (payload && payload.date) {
      const date = new Date(payload.date)
      commit('updateTargetDate', date)
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

      // Todo: Modify active satellites here to trigger watch in CesiumViewer

      console.log('Get updated orbits.')

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
  }
}

async function fetchAll(urls) {
  return Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((r) => r.json())
        .then((data) => ({ data, url }))
        .catch((error) => ({ error, url }))
    )
  )
}

function formatCountries(value) {
  if (value === undefined) {
    value = ''
  }

  let iso = AGCountries[value] || value
  let options = iso.split('/').map((d) => d.trim())
  let countries = options.map((option) => ({
    id: option,
    label: CountryISOs[option] || option
  }))

  return countries
}
