export const state = () => ({
  pages: []
})

export const mutations = {
  updatePages: (state, pages) => {
    state.pages = pages
  }
}

export const actions = {
  async getPages({ state, commit }) {
    if (state.pages.length) return

    try {
      let pages = await this.$axios.$get(
        `/wp-json/wp/v2/pages?page=1&per_page=20`
      )

      pages = pages
        .filter((el) => el.status === 'publish')
        .map(({ id, slug, title, excerpt, content }) => ({
          id,
          slug,
          title,
          excerpt,
          content
        }))

      commit('updatePages', pages)
    } catch (err) {
      console.log(err)
    }
  }
}
