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
    <form class="form analysis__search" @submit.prevent>
      <div
        v-for="filter in filterOptions"
        :key="filter.value"
        class="analysis__search-item"
      >
        <label :for="'filter__' + filter.value" class="form__label">
          {{ filter.label }}
        </label>
        <client-only>
          <v-select
            :id="'filter__' + filter.value"
            v-model="appliedFilterValues[filter.value]"
            :options="filterOptionValues[filter.value]"
            label="name"
            class="form__input form__input--light"
            placeholder="All"
            multiple
            :taggable="filter.taggable"
            :create-option="
              (option) => ({
                id: option.toLowerCase().replace(/\s+/g, ''),
                name: option
              })
            "
            :reduce="(option) => option.id"
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
      <div class="analysis__search-btns">
        <Button :on-click="resetFilters" :disabled="isRemovedDisabled"
          >Remove All</Button
        >
        <Button class="btn--apply" :on-click="filterPosts">
          <Icon id="check" name="check" aria-hidden="true" focusable="false" />
          Apply
        </Button>
      </div>
    </form>
    <div class="analysis__results">
      {{ totalPosts }}
      {{ 'result' | pluralize(totalPosts) }}

      <div class="analysis__sort form">
        <client-only>
          <v-select
            v-model="currentSort"
            class="dropdown--simple"
            :clearable="false"
            :options="sortOptions"
            :searchable="false"
            :value="currentSort"
            :reduce="(sortOptions) => sortOptions.value"
            @input="sortPosts"
          >
            <template #selected-option="{ label }">
              <Icon id="sort" name="sort" />
              {{ label }}
            </template>
          </v-select>
        </client-only>
      </div>
    </div>
    <PostList :posts="filteredPosts" size="wide" :is-compact="false" />
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
        { value: 'keywords', label: 'Keywords', taggable: true },
        { value: 'categories', label: 'Event Type', taggable: false },
        {
          value: 'satellites',
          label: 'Object Name',
          taggable: false
        },
        { value: 'country', label: 'Country', taggable: false },
        { value: 'user', label: 'User', taggable: false }
      ],
      appliedFilterValues: {
        keywords: [],
        categories: [],
        satellites: [],
        country: [],
        user: []
      },
      filteredPosts: [...this.$store.state.analysis.posts],
      isRemovedDisabled: true,
      currentSort: 'date_desc',
      sortOptions: [
        { value: 'date_asc', label: 'Oldest' },
        { value: 'date_desc', label: 'Newest' }
      ]
    }
  },
  computed: {
    totalPosts() {
      return this.filteredPosts.length
    },
    filterOptionValues() {
      return {
        keywords: this.tags,
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
  mounted() {
    const queryArgs = this.$route.query
    for (let key in this.appliedFilterValues) {
      if (queryArgs[key]) {
        const value = key === 'satellites' ? queryArgs[key] : +queryArgs[key]
        this.appliedFilterValues[key].push(value)
        this.filterPosts()
      }
    }
  },
  methods: {
    filterPosts() {
      const filtered = this.posts.filter((post) => {
        for (var key in this.appliedFilterValues) {
          // Keywords can come from a given list or be a general input. If from a given list, search our list of tags, otherwise, search our searchable string.
          if (
            key === 'keywords' &&
            (this.appliedFilterValues[key].some((filterId) =>
              post.tags.includes(filterId)
            ) ||
              this.appliedFilterValues[key].some((filterId) =>
                post.searchable.includes(filterId)
              ))
          ) {
            return true
          }

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
      this.isRemovedDisabled = false
    },
    sortPosts(value) {
      this.filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

      if (value == 'date_asc') {
        this.filteredPosts.reverse()
      }
    },
    resetFilters() {
      for (const key in this.appliedFilterValues) {
        if (Object.hasOwnProperty.call(this.appliedFilterValues, key)) {
          this.appliedFilterValues[key] = []
        }
      }

      this.filteredPosts = [...this.posts]
      this.isRemovedDisabled = true
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/form-input';
@import '../assets/css/pages/analysis';
</style>
