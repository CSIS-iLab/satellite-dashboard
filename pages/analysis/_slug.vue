<template>
  <article class="post">
    <div class="container">
      <header class="post__header">
        <span v-if="eventTypes.items[0]" class="post__category"
          ><a href="#">{{ eventTypes.items[0].eventType.name }}</a></span
        >
        <h1 class="post__title">{{ title }}</h1>
        <div class="post__meta">
          <ul class="post__meta-list">
            <li v-if="authors.items[0]" class="post__meta-author">
              Written by
              <span v-for="auth in authors.items" :key="auth.id">{{
                auth.author.name
              }}</span>
            </li>
            <li class="post__meta-date">
              Published <span>{{ formatDate(postDate) }}</span>
            </li>
            <li class="post__meta-updated">
              Last updated <span>{{ formatDate(updatedAt) }}</span>
            </li>
          </ul>
        </div>
        <p class="post__excerpt">{{ excerpt }}</p>
        <table v-if="satellites.items[0]" class="post__sat-table">
          <thead>
            <tr>
              <th>Object Name</th>
              <th>Country</th>
              <th>User</th>
              <th>Operator</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sat in satellites.items" :key="sat.id">
              <td>{{ sat.satellite.launchVehicle }}</td>
              <td>{{ sat.satellite.countryOfJurisdiction }}</td>
              <td>NEED DATA FOR USER(IE GOV'T OR COMMERCIAL)</td>
              <td>{{ operator }}</td>
              <td><a href="#">NEED URL</a></td>
            </tr>
          </tbody>
        </table>
      </header>

      <!-- eslint-disable-next-line -->
      <section class="post__content entry-content" v-html="content"></section>
      <section class="post__further">
        <p class="post__further-footnote">FOOTNOTES GO HERE</p>
        <h2 class="post__further-header">Further Reading</h2>
        <template v-for="reading in furtherReadings">
          <div :key="reading.url" class="post__further-article">
            <a :href="reading.url" class="post__further-link">
              {{ reading.name }}
              <span class="post__further-source">{{ reading.author }}</span>
            </a>
            <!-- <div class="post__further-icon"></div> -->
            <a :href="reading.url" class="post__link-circle">
              <Icon class="post__link-icon" name="external-link" />
            </a>
          </div>
        </template>
      </section>
      <footer class="post__footer">
        <div v-if="authors.items[0]" class="post__author-wrapper">
          <p
            v-for="author in authors.items"
            :key="author.id"
            class="post__author-bio"
          >
            <span class="post__author-name">{{ author.author.name }}</span>
            {{ author.author.biography }}
          </p>
        </div>
        <div class="post__tag">
          <h2 class="post__tag-header">tags</h2>
          <ul class="post__tag-list">
            <li v-for="t in tags.items" :key="t.id" class="post__tag-name">
              <a href="#">
                {{ t.tag.name }}
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
    <div class="post__side"></div>
    <section>
      <div class="post__related-wrapper">
        <template v-for="relatedPost in relatedPosts">
          <div :key="relatedPost.id" class="post__related-block">
            <nuxt-link
              :to="'/analysis/' + relatedPost.slug"
              class="post__related-link"
            >
              <h2 class="post__related-title">
                {{ relatedPost.title }}
              </h2>
              <p class="post__related-author">
                Written By {{ relatedPost.authors.items[0].author.name }}
              </p>
              <p class="post__related-date">
                Published {{ formatDate(relatedPost.postDate) }}
              </p>
            </nuxt-link>
          </div>
        </template>
      </div>
    </section>
  </article>
</template>
<script>
import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '@/src/graphql/queries'
import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    Icon
  },
  async asyncData({ params }) {
    try {
      const data = await API.graphql(
        graphqlOperation(queries.postsBySlug, { slug: params.slug })
      )
      /*
        because of API requirements around key and unique value, we get a list
        back, but we can be pretty sure it will be the only item, so grab 0 index
        otherwise, on failure, this is a bad slug
      */
      const post = data.data.postsBySlug.items[0]
      const relatedPosts = []
      for (const index in post.relatedPostIDs) {
        const relatedPostData = await API.graphql(
          graphqlOperation(queries.getPost, { id: post.relatedPostIDs[index] })
        )
        relatedPosts.push(relatedPostData.data.getPost)
      }
      post.relatedPosts = relatedPosts
      return post
    } catch (error) {
      return false
    }
  },
  computed: {
    operator() {
      if (this.satellites.items[0].satellite.operator === null) {
        return 'N/A'
      } else {
        return this.satellites.items[0].satellite.operator
      }
    }
  },
  methods: {
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
    }
  },
  head() {
    return {
      title: this.title,
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
