const siteURL = 'https://satdash.wpengine.com'

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
      let pages = await fetch(
        `${siteURL}/wp-json/wp/v2/pages?page=1&per_page=20`
      ).then((res) => res.json())

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
