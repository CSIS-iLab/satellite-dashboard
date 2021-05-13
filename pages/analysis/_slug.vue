<template>
  <article class="post">
    <div class="container">
      <header class="post__header">
        <PostCategories :categories="category" />
        <h1 class="post__title">{{ post.title.rendered }}</h1>
        <div class="post__meta">
          <PostMeta
            :date="post.date"
            :authors="post.authors"
            :modified="post.modified"
          />
        </div>
        <!-- eslint-disable-next-line -->
        <div class="post__excerpt" v-html="post.excerpt.rendered"></div>
        <table v-if="relatedSatellites" class="post__sat-table">
          <thead>
            <tr>
              <th>Object Name</th>
              <th>Country</th>
              <th class="desktop-only">User</th>
              <th class="desktop-only">Operator</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sat in relatedSatellites" :key="sat.catalog_id">
              <td>{{ sat.name }}</td>
              <td>{{ sat.country }}</td>
              <td class="desktop-only">{{ sat.user }}</td>
              <td class="desktop-only">{{ sat.operator }}</td>
              <td>
                <nuxt-link :to="`/?satellites=${sat.catalog_id}`"
                  >View</nuxt-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <!-- eslint-disable-->
      <section
        class="post__content entry-content"
        v-html="postContent"
      ></section>
      <!-- eslint-enable-->
      <section class="post__further">
        <ol v-if="post.footnotes" class="post__further-notes">
          <li
            v-for="(note, index) in post.footnotes"
            :key="index"
            class="post__further-footnote"
            v-html="note"
          ></li>
        </ol>
        <template v-if="post.acf.further_reading">
          <h2 class="post__further-header">
            Further Reading
          </h2>
          <ul role="list">
            <li
              v-for="reading in post.acf.further_reading"
              :key="reading.url"
              class="post__further-article"
            >
              <a :href="reading.url" class="post__further-link">
                {{ reading.publication_name }}
                <span class="post__further-source">{{
                  reading.publication_organization
                }}</span>
              </a>
              <a :href="reading.url" class="post__further-circle">
                <Icon class="post__further-icon" name="external-link" />
              </a>
            </li>
          </ul>
        </template>
      </section>
      <footer class="post__footer">
        <ul v-if="post.authors" class="post__author-wrapper" role="list">
          <li
            v-for="author in post.authors"
            :key="author.user_nicename"
            class="post__author-bio"
            v-html="author.description"
          ></li>
        </ul>
        <div class="post__tag">
          <template v-if="keywords.length > 0">
            <h2 class="post__tag-header">Tags</h2>
            <ul class="post__tag-list" role="list">
              <li
                v-for="keyword in keywords"
                :key="keyword.value"
                class="post__tag-name"
              >
                <nuxt-link :to="`/analysis/?${keyword.url}=${keyword.value}`">{{
                  keyword.label
                }}</nuxt-link>
              </li>
            </ul>
          </template>
        </div>
      </footer>
    </div>
    <aside v-if="relatedPosts" class="post__related-wrapper">
      <!-- Here goes the related post -->
      <template v-for="relatedPost in relatedPosts">
        <article :key="relatedPost.ID" class="post__related-block">
          <div>
            <h2 class="post__related-title">
              <nuxt-link
                :to="relatedPost.slug"
                class="post__related-wrapper card-link"
              >
                {{ relatedPost.title.rendered }}
              </nuxt-link>
            </h2>
            <PostMeta :date="relatedPost.date" :authors="relatedPost.authors" />
          </div>
        </article>
      </template>
    </aside>
  </article>
</template>
<script>
import { mapState } from 'vuex'
import PostMeta from '~/components/global/PostMeta.vue'
import PostCategories from '~/components/global/PostCategories.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    Icon,
    PostCategories,
    PostMeta
  },
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  computed: {
    post() {
      return this.posts.find((el) => el.slug === this.slug)
    },
    postContent() {
      return `${this.post.content.rendered}<div class="clearfix"></div>`
    },
    relatedPosts() {
      if (!Array.isArray(this.post.acf.related_analysis)) {
        return
      }
      let relatedAnalysis = []
      this.post.acf.related_analysis.forEach((relPost) => {
        relatedAnalysis.push(this.posts.find(({ id }) => id == relPost.ID))
      })
      return relatedAnalysis
    },
    relatedSatellites() {
      if (!Array.isArray(this.post.acf.related_satellites)) {
        return
      }

      let satellites = []
      this.post.acf.related_satellites.forEach((sat) => {
        const meta = this.satellites[sat.acf.catalog_id]

        if (!meta) {
          return
        }

        satellites.push({
          catalog_id: meta.catalog_id,
          name: meta.Name,
          country:
            meta.countryOfJurisdiction.map((d) => d.label).join(' / ') || 'N/A',
          user: meta.User || 'N/A',
          operator: meta.Operator || 'N/A'
        })
      })

      return satellites
    },
    category() {
      return this.getKeywords('categories', 'categories', 'categories')
    },
    keywords() {
      let keywords = [
        ...this.keywordsSatellites,
        ...this.keywordsTags,
        ...this.keywordsCountries,
        ...this.keywordsUsers
      ]
      return keywords
    },
    keywordsTags() {
      return this.getKeywords('tags', 'tags', 'keywords')
    },
    keywordsCountries() {
      return this.getKeywords('country', 'countries', 'country')
    },
    keywordsUsers() {
      return this.getKeywords('user', 'users', 'user')
    },
    keywordsSatellites() {
      if (!this.post.acf.keywords_satellites) {
        return []
      }

      let keywords = []
      this.post.acf.keywords_satellites.forEach((sat) => {
        const { ID } = sat
        const meta = this.satellites[sat.acf.catalog_id]

        if (!meta) {
          return
        }

        keywords.push({
          value: sat.acf.catalog_id,
          label: meta.Name,
          url: 'satellites'
        })
      })
      return keywords
    },
    ...mapState({
      posts: (state) => state.analysis.posts,
      satellites: (state) => state.satellites.satellites,
      tags: (state) => state.analysis.tags,
      categories: (state) => state.analysis.categories,
      countries: (state) => state.analysis.countries,
      users: (state) => state.analysis.users
    })
  },
  methods: {
    getKeywords(taxonomy, state, url) {
      if (!this.post[taxonomy]) {
        return []
      }

      const keywords = this.post[taxonomy].map((d) => ({
        value: d,
        label: this[state].find((t) => t.id === d)?.name.trim(),
        state,
        url
      }))

      return keywords
    },
    formatDate(d) {
      let formattedDate = d
      if (d === this.postDate) {
        formattedDate = d.replace('-', '/')
      }
      let date = new Date(formattedDate)
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      return date.toLocaleDateString('en', options)
    },
    showAuthors(authors) {
      if (!authors) return
      let author = ''
      authors.forEach((a) => (author = a.display_name))
      return author
    }
  },
  head() {
    return {
      title: this.post.title.rendered,
      bodyAttrs: {
        class: 'page-layout'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/post';
@import '../assets/css/pages/post-content';
</style>
