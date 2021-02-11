const siteURL = 'https://satdash.wpengine.com'

export const state = () => ({
  glossary: {}
})

export const mutations = {
  updateGlossary: (state, glossary) => {
    state.glossary = glossary
  }
}

export const actions = {
  async getGlossary({ state, commit }) {
    if (state.glossary.length) return

    try {
      let glossary = await fetch(
        `${siteURL}/wp-json/wp/v2/glossary?page=1&per_page=100`
      ).then((res) => res.json())

      let glossaryObj = {}

      glossary = glossary
        .filter((el) => el.status === 'publish')
        .map(({ id, slug, title, acf }) => ({
          id,
          slug,
          title: title.rendered,
          short_definition: acf.short_definition,
          definition: acf.definition,
          further_reading: acf.further_reading
        }))
        .forEach((item) => {
          glossaryObj[item.slug] = item
        })

      commit('updateGlossary', Object.freeze(glossaryObj))
    } catch (err) {
      console.log(err)
    }
  }
}
