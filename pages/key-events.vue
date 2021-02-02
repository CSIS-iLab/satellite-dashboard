<template>
  <Page title="Key Events" :content-has-bg="false">
    <div slot="header">
      <p class="page__desc">
        Key Events are automatically highilighted activities that are unique and
        likely to be of particular interest. Currently, this list only includes
        rendezvous and proximity operation activities in the geosynchronous
        region.
      </p>
      <p class="page__desc">
        The event summaries shown here are a function of the underlying data,
        which may be missing, incomplete, or have significant uncertainty. Learn
        more about the Dashboard's methodology here.
      </p>
    </div>
    <section class="post__content entry-content">
      <p>Coming soon.</p>
      <vue-good-table
        mode="remote"
        :total-rows="totalRecords"
        :is-loading.sync="isLoading"
        :pagination-options="{
          enabled: true,
          mode: 'pages',
          perPage: serverParams.perPage,
          dropdownAllowAll: false
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: serverParams.sort
        }"
        :rows="rows"
        :columns="columns"
        style-class="vgt-table striped"
        @on-page-change="onPageChange"
        @on-sort-change="onSortChange"
        @on-column-filter="onColumnFilter"
        @on-per-page-change="onPerPageChange"
      />
    </section>
  </Page>
</template>

<script>
import Page from '~/layout/page'

export default {
  layout: 'layout',
  components: {
    Page
  },
  async fetch() {
    const events = await this.$axios.$get(
      'http://satellite-dashboard.local/wp-json/satdash/v1/close_approaches',
      {
        params: this.serverParams
      }
    )
    this.totalRecords = events.total_results
    this.rows = events.rows
  },
  data() {
    return {
      isLoading: false,
      columns: [
        {
          label: 'Event Date',
          field: 'time_of_close_approach'
        },
        {
          label: 'Name',
          field: 'catalog_id_1'
        },
        {
          label: 'Name',
          field: 'catalog_id_2'
        },
        {
          label: 'Est. Distance',
          field: 'min_distance'
        }
      ],
      rows: [],
      totalRecords: 0,
      serverParams: {
        sort: [
          {
            field: 'time_of_close_approach',
            type: 'desc'
          },
          {
            field: 'min_distance',
            type: 'asc'
          }
        ],
        page: 1,
        perPage: 50
      }
    }
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },
    onSortChange(params) {
      // Allow for sorting by multiple columns
      let updatedSort = []
      params.forEach((param) => {
        updatedSort.push({
          type: param.type,
          field: param.field
        })
      })

      this.updateParams({
        sort: updatedSort
      })
      this.loadItems()
    },
    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },
    // load items is what brings back the rows from server
    loadItems() {
      console.log('load items')
      this.$fetch()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/post-component';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
</style>
