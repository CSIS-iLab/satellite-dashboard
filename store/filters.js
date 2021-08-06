const getResettableDefaultState = () => {
  return {
    activeFilters: []
  }
}

export const state = () => ({
  ...getResettableDefaultState()
})

export const getters = {
  activeFiltersCount: (state) => {
    return state.activeFilters.length
  }
}

export const mutations = {
  resetFiltersState: (state) => {
    const items = getResettableDefaultState()
    Object.keys(items).forEach((key) => {
      state[key] = items[key]
    })
  },
  updateActiveFilters: (state, filters) => {
    state.activeFilters = filters
  }
}
