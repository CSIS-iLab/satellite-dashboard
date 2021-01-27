<template>
  <article class="post">
    <div class="container">
      <header class="post__header">
        <!-- <span v-if="eventTypes.items[0]" class="post__category"
          ><a href="#">{{ eventTypes.items[0].eventType.name }}</a></span
        > -->
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
        <table v-if="post.acf.related_satellites" class="post__sat-table">
          <thead>
            <tr>
              <th>Object Name</th>
              <th>Country</th>
              <th class="desktop">User</th>
              <th class="desktop">Operator</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sat in post.acf.related_satellites" :key="sat.ID">
              <td>{{ sat.post_name }}</td>
              <td>Colmn 2</td>
              <td>Colmn 3</td>
              <td>Colmn 4</td>
            </tr>

            <!-- <tr v-for="sat in satellites.items" :key="sat.id">
              <td>{{ sat.satellite.launchVehicle }}</td>
              <td>{{ sat.satellite.countryOfJurisdiction }}</td>
              <td class="desktop">
                NEED DATA FOR USER(IE GOV'T OR COMMERCIAL)
              </td>
              <td class="desktop">{{ operator }}</td>
              <td><a href="#">NEED URL</a></td>
            </tr> -->
          </tbody>
        </table>
      </header>

      <!-- eslint-disable-->
      <section
        class="post__content entry-content"
        v-html="post.content.rendered"
      ></section>
      <!-- eslint-enable-->
      <section class="post__further">
        <p class="post__further-footnote">FOOTNOTES GO HERE</p>
        {{ post.meta.further_reading }}
        <!-- <template v-for="reading in furtherReadings">
          <h2 :key="reading.url" class="post__further-header">
            Further Reading
          </h2>
          <div :key="reading.url" class="post__further-article">
            <a :href="reading.url" class="post__further-link">
              {{ reading.name }}
              <span class="post__further-source">{{ reading.author }}</span>
            </a>
            <a :href="reading.url" class="post__further-circle">
              <Icon class="post__further-icon" name="external-link" />
            </a>
          </div>
        </template> -->
      </section>
      <footer class="post__footer">
        <!-- <div v-if="authors.items[0]" class="post__author-wrapper">
          <p
            v-for="author in authors.items"
            :key="author.id"
            class="post__author-bio"
          >
            <span class="post__author-name">{{ author.author.name }}</span>
            {{ author.author.biography }}
          </p>
        </div> -->
        <div class="post__tag">
          <h2 class="post__tag-header">Tags</h2>
          {{ tagsArray }}
          <!-- <ul class="post__tag-list">
            <li v-for="t in tags.items" :key="t.id" class="post__tag-name">
              <a href="#">
                {{ t.tag.name }}
              </a>
            </li>
          </ul> -->
        </div>
      </footer>
    </div>
    <section class="post__related-wrapper"></section>
  </article>
</template>
<script>
import PostMeta from '~/components/global/PostMeta.vue'
// import Icon from '~/components/global/Icon.vue'

export default {
  components: {
    // Icon
    PostMeta
  },
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  computed: {
    operator() {
      if (this.satellites.items[0].satellite.operator === null) {
        return 'N/A'
      } else {
        return this.satellites.items[0].satellite.operator
      }
    },
    posts() {
      return this.$store.state.analysis.posts
    },
    post() {
      return this.posts.find((el) => el.slug === this.slug)
    },
    tagsArray() {
      let tagsArray = [
        this.post.tags,
        this.post.country,
        this.post.user,
        this.post.acf.keywords_satellites
      ]
      return console.log(tagsArray)
    }
  },
  created() {
    this.$store.dispatch('analysis/getPosts')
    this.$store.dispatch('analysis/getTags')
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
