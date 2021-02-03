export const state = () => ({
  activeFilters: []
})

export const getters = {
  activeFiltersCount: (state) => {
    return state.activeFilters.length
  }
}

export const mutations = {
  updateActiveFilters: (state, filters) => {
    state.activeFilters = filters
  }
}
