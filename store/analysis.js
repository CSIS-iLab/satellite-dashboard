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
              footnotes: formatFootnotes(content.rendered),
              footnotesOld: formatFootnotesRegex(content.rendered),
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

function formatFootnotes(content) {
  let newContent = parse(content)
  // let spansEl = newContent.querySelectorAll('.easy-footnote')
  // let formattedFootnotes = null
  // if (spansEl && spansEl.length) {
  //   formattedFootnotes = spansEl.map((span) => span.childNodes[0]._attrs.title)
  // }
  // return formattedFootnotes

  // testing
  let spansID = newContent.querySelectorAll('.easy-footnote-margin-adjust')
  // spansID.forEach((span) => console.log(span.id))
  // console.log(spansID)
  let spansAEl = newContent.querySelectorAll('.easy-footnote a')
  let fFootnotes = null
  if (spansAEl) {
    spansAEl.forEach((a, i) => a.setAttribute('href', '#' + spansID[i].id))
    fFootnotes = spansAEl.map((a) => a.toString())
  }
  fFootnotes.forEach((a) => {
    // console.log(a)
    let aa = parse(a)
    console.log(aa.firstChild)
    // console.log(aa)
    let sup = aa.firstChild
    aa.removeChild(sup)
    // console.log(aa.toString())
  })
  return fFootnotes
  // spansAEl.forEach((a) => console.log(a._attrs.title))
  // let formattedFootnotes = null
  // if (spansAEl && spansAEl.length) {
  //   formattedFootnotes = spansAEl.map((span) => span.childNodes[0]._attrs.title)
  // }
  // return formattedFootnotes
  // aEl.forEach((a) => console.log(a))
  // formattedFootnotes = aEl.map((a) => a.rawAttrs)
  // if (aEl) {
  //   aEl.forEach((a, i) => a.setAttribute('href', '#' + span[i].id))
  // aEl.forEach((a, i) => a.setAttribute('href', '#' + span[i].id))
  // }
  // console.log(aEl)
  // console.log(aEl.toString())
  // return aEl.toString()
  // console.log(newContent.querySelectorAll('.easy-footnote a').toString())
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
  // console.log(formattedFootnotes)
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
