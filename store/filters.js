export const state = () => ({
  activeFilters: []
})

export const getters = {
  activeFilters: (state) => {
    return state.activeFilters
  },
  activeFiltersCount: (state, getters) => {
    return getters.activeFilters.length
  }
}

export const mutations = {
  updateActiveFilters: (state, filters) => {
    state.activeFilters = filters
  }
}
