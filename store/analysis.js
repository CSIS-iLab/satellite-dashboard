import { decode } from 'html-entities'
import { parse } from 'node-html-parser'
import { squash } from '~/services/squash'

export const state = () => ({
  posts: [],
  tags: [],
  categories: [],
  countries: [],
  users: []
})

export const getters = {
  latestPosts: (state) => {
    return state.posts.slice(0, 4)
  }
}

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updateTags: (state, tags) => {
    state.tags = tags
  },
  updateCategories: (state, categories) => {
    state.categories = categories
  },
  updateCountries: (state, countries) => {
    state.countries = countries
  },
  updateUsers: (state, users) => {
    state.users = users
  }
}

export const actions = {
  async getPosts({ state, commit }) {
    if (state.posts.length) return

    try {
      let posts = await this.$axios.$get(
        '/wp-json/wp/v2/posts?page=1&per_page=100'
      )

      posts = posts
        .filter((el) => el.status === 'publish')
        .map(
          ({
            id,
            slug,
            title,
            excerpt,
            date,
            modified,
            tags,
            content,
            coauthors_full,
            meta,
            acf,
            categories,
            country,
            user
          }) => {
            const formattedContent = formatContent(content.rendered)
            return {
              id,
              slug,
              title,
              excerpt,
              date,
              modified,
              tags,
              content,
              authors: coauthors_full,
              meta,
              acf,
              categories,
              country,
              user,
              formattedContent: formattedContent,
              // footnotes: formatFootnotes(content.rendered),
              // footnotesOld: formatFootnotesRegex(content.rendered),
              satellites: getSatellites(acf),
              searchable: searchableContent(title, content)
            }
          }
        )

      commit('updatePosts', posts)
    } catch (err) {
      console.log(err)
    }
  },
  async getTags({ state, commit }) {
    if (state.tags.length) return

    let allTags = state.posts.reduce((acc, item) => {
      return acc.concat(item.tags)
    }, [])
    allTags = allTags.join()

    try {
      let tags = await this.$axios.$get(
        `/wp-json/wp/v2/tags?page=1&per_page=40&include=${allTags}`
      )

      tags = tags.map(({ id, name }) => ({
        id,
        name
      }))

      commit('updateTags', tags)
    } catch (err) {
      console.log(err)
    }
  },
  async getCategories({ state, commit }) {
    if (state.categories.length) return

    let allCategories = state.posts.reduce((acc, item) => {
      return acc.concat(item.categories)
    }, [])
    allCategories = allCategories.join()

    try {
      let categories = await this.$axios.$get(
        `/wp-json/wp/v2/categories?page=1&per_page=40&include=${allCategories}`
      )

      categories = categories.map(({ id, name }) => ({
        id,
        name
      }))

      commit('updateCategories', categories)
    } catch (err) {
      console.log(err)
    }
  },
  async getCountries({ state, commit }) {
    if (state.countries.length) return

    let allCountries = state.posts.reduce((acc, item) => {
      return acc.concat(item.countries)
    }, [])
    allCountries = allCountries.join()

    try {
      let countries = await this.$axios.$get(
        `/wp-json/wp/v2/country?page=1&per_page=40&include=${allCountries}`
      )

      countries = countries.map(({ id, name }) => ({
        id,
        name
      }))

      commit('updateCountries', countries)
    } catch (err) {
      console.log(err)
    }
  },
  async getUsers({ state, commit }) {
    if (state.users.length) return

    let allUsers = state.posts.reduce((acc, item) => {
      return acc.concat(item.users)
    }, [])
    allUsers = allUsers.join()

    try {
      let users = await this.$axios.$get(
        `/wp-json/wp/v2/user?page=1&per_page=40&include=${allUsers}`
      )

      users = users.map(({ id, name }) => ({
        id,
        name
      }))

      commit('updateUsers', users)
    } catch (err) {
      console.log(err)
    }
  }
}

function formatContent(content) {
  let formattedContent = {}
  const CONTENT_PARSED = parse(content)
  // Grabs all the spans that have the id that we need
  let spansID = CONTENT_PARSED.querySelectorAll('.easy-footnote-margin-adjust')
  // Grabs all the spans that contains the a tags
  let spansAEl = CONTENT_PARSED.querySelectorAll('.easy-footnote a')
  // if (spansAEl.length < 1) return null
  if (!spansAEl.length) {
    formattedContent.content = CONTENT_PARSED.toString()
  } else {
    // formattedContent.content = formatC(CONTENT_PARSED)
    formattedContent.content = formatC(CONTENT_PARSED, spansID)
    formattedContent.footnotes = formatF(spansAEl, spansID)
    // console.log(formattedContent)
  }
  return formattedContent
}

function formatC(CONTENT_PARSED, spansID) {
  let newContent = []
  // console.log(CONTENT_PARSED)
  // Grabs all the spans that contains the a tags
  let spansAEl = CONTENT_PARSED.querySelectorAll('.easy-footnote a')
  // console.log(spansAEl.length)
  if (!spansAEl.length) return null
  spansAEl.forEach((s, i) => {
    // console.log(s.firstChild)
    // s._attrs.href = `#${spansID[i].id}-bottom`
    s.setAttribute('href', `#${spansID[i].id}-bottom`)
    // console.log(s.firstChild)
  })
  return CONTENT_PARSED.toString()
  // return CONTENT_PARSED
}
function formatF(spansAEl, spansID) {
  let formattedFootnotes = []
  spansAEl.forEach((a, i) => {
    a.removeChild(a.firstChild)
    a.setAttribute('id', spansID[i].id)
    a.set_content(a._attrs.title)
    formattedFootnotes.push({
      id: `${a._attrs.id}-bottom`,
      title: a._attrs.title
    })
  })
  return formattedFootnotes
}

function formatFootnotes(content) {
  let formattedContent = []
  let formattedFootnotes = []
  let newContent = parse(content)
  // Grabs all the spans that have the id that we need
  let spansID = newContent.querySelectorAll('.easy-footnote-margin-adjust')
  // Grabs all the spans that contains the a tags
  let spansAEl = newContent.querySelectorAll('.easy-footnote a')
  console.log(spansAEl == null)
  // if (!spansAEl && !spansAEl.length) return null
  if (spansAEl.length < 1) return null
  spansAEl.forEach((a, i) => {
    a.removeChild(a.firstChild)
    a.setAttribute('id', spansID[i].id)
    a.set_content(a._attrs.title)
    formattedFootnotes.push({
      id: `${a._attrs.id}-bottom`,
      title: a._attrs.title
    })
  })
  formattedContent.push({
    content: content,
    footnotes: formattedFootnotes
  })
  console.log(formattedContent[0].footnotes)
  return formattedFootnotes
}

function formatFootnotesRegex(content) {
  // eslint-disable-next-line no-useless-escape
  const regex = /<span[^>]*>(.*?)<\/span>/gm
  const footnotes = content.match(regex)
  let formattedFootnotes = null
  if (footnotes && footnotes.length) {
    formattedFootnotes = footnotes
      .filter((item) =>
        item.match(/<span\s(?:class='easy-footnote')>(.*)<\/span>/)
      )
      .map((item) => decode(item.match(/title=['"](.*)['"]/)[1]))
  }
  return formattedFootnotes
}

function searchableContent(title, content) {
  const text = `${title.rendered} ${content.rendered}`
  return squash(text)
}

function getSatellites(acf) {
  let satellites = [acf.keywords_satellites, acf.related_satellites].flat()

  return satellites
    .filter((sat) => sat) // removes false or undefined results
    .map((sat) => sat.acf.catalog_id)
    .filter((sat, i, ar) => ar.indexOf(sat) === i)
}
