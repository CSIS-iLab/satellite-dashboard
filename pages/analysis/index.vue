<template>
  <Page title="Analysis">
    <div slot="header">
      <p class="page__desc">
        The following analysis pieces were authored by the Dashboard's analysis
        team to provide a more detailed summary of an event, including the
        objects involved, the timeframe, and its signifcance for international
        space security.
      </p>
    </div>
    <form class="form" @submit.prevent>
      Keywords<br />
      <div v-for="filter in filterOptions" :key="filter.value">
        <label :for="'filter__' + filter.value" class="form__label">
          {{ filter.label }}
        </label>
        <client-only>
          <v-select
            :id="'filter__' + filter.value"
            v-model="appliedFilterValues[filter.value]"
            :options="filterOptionValues[filter.value]"
            label="name"
            :reduce="(option) => option.id"
            class="form__input"
            placeholder="All"
            multiple
          >
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <Icon id="plus" name="plus" />
                <Icon id="minus" name="minus" />
              </span>
            </template>
            <template #option="{ name }">
              <Icon id="check" name="check" />{{ name }}
            </template>
          </v-select>
        </client-only>
      </div>
      <div class="key-events__search-btns">
        <Button :on-click="resetFilters">Remove All</Button>
        <Button class="btn--apply" :on-click="filterPosts">
          <Icon id="check" name="check" />
          Apply
        </Button>
      </div>
    </form>
    <PostList :posts="sortedPosts" size="wide" :is-compact="false" />
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'
import Page from '~/layout/page'
import PostList from '~/components/global/PostList.vue'

export default {
  layout: 'layout',
  components: {
    Button,
    Icon,
    Page,
    PostList
  },
  data: function() {
    return {
      filterOptions: [
        { value: 'categories', label: 'Event Type' },
        {
          value: 'satellites',
          label: 'Object Name'
        },
        { value: 'country', label: 'Country' },
        { value: 'user', label: 'User' }
      ],
      appliedFilterValues: {
        categories: [],
        satellites: [],
        country: [],
        user: []
      },
      filteredPosts: []
    }
  },
  computed: {
    sortedPosts() {
      return this.filteredPosts.length > 0 ? this.filteredPosts : this.posts
    },
    filterOptionValues() {
      return {
        categories: this.categories,
        satellites: this.satelliteOptions,
        country: this.countries,
        user: this.users
      }
    },
    satelliteOptions() {
      const satellites = this.posts
        .filter((post) => post.satellites.length)
        .map((post) => post.satellites)
        .flat()
        .filter((sat, i, ar) => ar.indexOf(sat) === i)
        .map((sat) => ({
          id: sat,
          name: this.satellites[sat].Name
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

      return satellites
    },
    ...mapState({
      categories: (state) => state.analysis.categories,
      countries: (state) => state.analysis.countries,
      posts: (state) => state.analysis.posts,
      satellites: (state) => state.satellites.satellites,
      tags: (state) => state.analysis.tags,
      users: (state) => state.analysis.users
    })
  },
  methods: {
    filterPosts() {
      const filtered = this.posts.filter((post) => {
        for (var key in this.appliedFilterValues) {
          if (
            post[key] !== undefined &&
            this.appliedFilterValues[key].some((filterId) =>
              post[key].includes(filterId)
            )
          ) {
            return true
          }
        }
        return false
      })
      this.filteredPosts = filtered
    },
    resetFilters() {
      for (const key in this.appliedFilterValues) {
        if (Object.hasOwnProperty.call(this.appliedFilterValues, key)) {
          this.appliedFilterValues[key] = []
        }
      }

      this.filterPosts()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/form-input';
@import '../assets/css/pages/analysis';
</style>
