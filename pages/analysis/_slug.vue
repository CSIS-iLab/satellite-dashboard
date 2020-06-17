<template>
  <article class="post">
    <div class="container">
      <header class="post__header">
        <span v-if="eventTypes.items[0]" class="post__category">{{
          eventTypes.items[0].eventType.name
        }}</span>
        <h1 class="post__title">{{ title }}</h1>
        <p class="post__excerpt">{{ excerpt }}</p>
      </header>
      <aside>
        <p v-if="authors.items[0]">
          Written by
          <span v-for="auth in authors.items" :key="auth.id">{{
            auth.author.name
          }}</span>
        </p>
        <p>
          Published <span>{{ formatDate(postDate) }}</span>
        </p>
        <p>
          Last updated <span>{{ formatDate(updatedAt) }}</span>
        </p>
      </aside>
      <table v-if="satellites.items[0]">
        <tr>
          <th>Object Name</th>
          <th>Country</th>
          <th>User</th>
          <th>Operator</th>
          <th></th>
        </tr>
        <tr v-for="sat in satellites.items" :key="sat.id">
          <td>{{ sat.satellite.launchVehicle }}</td>
          <td>{{ sat.satellite.countryOfJurisdiction }}</td>
          <td>NEED DATA FOR USER(IE GOV'T OR COMMERCIAL)</td>
          <td>{{ operator }}</td>
          <td>NEED SATELLITE URL</td>
        </tr>
      </table>

      <!-- eslint-disable-next-line -->
      <section class="post__content entry-content" v-html="content"></section>
      <section class="post__further">
        <p class="post__further-footnote">FOOTNOTES GO HERE</p>
        <h2 class="post__further-header">Further Reading</h2>
        <p class="post__further-article">
          LINK FURTHER READING TITLE |
          <span class="post__further-article-source">SOURCE NAME</span>
        </p>
        <p class="post__further-article">
          LINK FURTHER READING TITLE |
          <span class="post__further-article-source">SOURCE NAME</span>
        </p>
        <p class="post__further-article">
          LINK FURTHER READING TITLE |
          <span class="post__further-article-source">SOURCE NAME</span>
        </p>
      </section>
      <div class="post__footer">
        <div v-if="authors.items[0]" class="post__author-wrapper">
          <p
            v-for="auth in authors.items"
            :key="auth.id"
            class="post__author-bio"
          >
            <span class="post__author-name">{{ auth.author.name }}</span>
            HOW DO I ACCESS AUTHOR BIOS BASED ON THE AUTHOR ID?
          </p>
        </div>
        <div v-if="tags.items[0]">
          <p>
            tags
            <span v-for="t in tags.items" :key="t.id">{{ t.tag.name }}</span>
          </p>
        </div>
      </div>
    </div>
    <footer>
      <div class="post__related-wrapper">
        <div class="post__related-block">
          <a href="#" class="post__related-link">
            <h2 class="post__related-title">
              HOW DO I ACCESS THE POST TITLE AND FEATURED IMG FROM
              RELATEDPOSTIDS?
            </h2>
            <p class="post__related-author">
              Written By NEED TO ACCESS AUTHOR
            </p>
            <p class="post__related-date">Published NEED TO ACCESS DATE</p>
          </a>
          <img
            class="post__related-img"
            src="http://placekitten.com/200/138"
            alt=""
          />
        </div>
        <div class="post__related-block">
          <a href="#" class="post__related-link">
            <h2 class="post__related-title">
              HOW DO I ACCESS THE POST TITLE AND FEATURED IMG FROM
              RELATEDPOSTIDS?
            </h2>
            <p class="post__related-author">
              Written By NEED TO ACCESS AUTHOR
            </p>
            <p class="post__related-date">Published NEED TO ACCESS DATE</p>
          </a>
          <img
            class="post__related-img"
            src="http://placekitten.com/200/138"
            alt=""
          />
        </div>
      </div>
    </footer>
  </article>
</template>
<script>
import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '@/src/graphql/queries'

export default {
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
      return data.data.postsBySlug.items[0]
    } catch (error) {
      return false
    }
  },
  computed: {
    operator() {
      console.log(this)
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
</style>
