<template>
  <Page title="Key Events">
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
    <section class="post__content">
      <vue-good-table
        mode="remote"
        :total-rows="totalRecords"
        :is-loading.sync="isLoading"
        max-height="700px"
        :fixed-header="true"
        :pagination-options="{
          enabled: totalRecords > serverParams.perPage ? true : false,
          mode: 'pages',
          perPage: serverParams.perPage,
          pageLabel: 'Page',
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
      >
        <template slot="table-column" slot-scope="props">
          <template v-if="props.column.sublabel">
            {{ props.column.label }} <span>{{ props.column.sublabel }}</span>
          </template>
          <template v-else>
            {{ props.column.label }}
          </template>
        </template>
        <template slot="table-row" slot-scope="props">
          <!-- eslint-disable -->
          <template v-if="props.column.field == 'time_of_close_approach'">
            <div v-html="formatDate(props.row.time_of_close_approach)"></div>
          </template>
          <!-- eslint-enable -->
          <template
            v-else-if="
              props.column.field === 'catalog_id_1' ||
                props.column.field === 'catalog_id_2'
            "
          >
            <div
              class="sat__basic sat__basic--status"
              :data-status="
                satellites[props.formattedRow[props.column.field]].Status
              "
            >
              <div class="sat__name">
                {{ satellites[props.formattedRow[props.column.field]].Name }}
              </div>
              <div class="sat__id">
                {{ props.formattedRow[props.column.field] }}
              </div>
            </div>
          </template>
          <ul
            v-else-if="props.column.field == 'actions'"
            class="sat__actions"
            role="list"
          >
            <li>
              <Icon id="orbit" name="orbit" />
            </li>
            <li>
              <Icon id="graph" name="graph" />
            </li>
          </ul>
          <template v-else>
            {{ props.formattedRow[props.column.field] }}
          </template>
        </template>
      </vue-good-table>
    </section>
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import Page from '~/layout/page'
// import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  layout: 'layout',
  components: {
    Page,
    // Button,
    Icon
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
          field: 'time_of_close_approach',
          sublabel: 'UTC'
        },
        {
          label: 'Object A',
          field: 'catalog_id_1'
        },
        {
          label: 'Object B',
          field: 'catalog_id_2'
        },
        {
          label: 'Est. Distance',
          field: 'min_distance',
          sublabel: 'km',
          tdClass: 'text--right',
          formatFn: function(value) {
            return Number(value).toLocaleString('en-US')
          }
        },
        { label: '', field: 'actions', sortable: false }
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
  computed: {
    ...mapState({
      satellites: (state) => state.satellites.satellites
    })
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
    },
    formatDate(date) {
      const event = new Date(date)

      const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }

      const timeOptions = {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      const formattedDate = event.toLocaleDateString('en-US', dateOptions)
      const formattedTime = event.toLocaleTimeString('en-US', timeOptions)

      return `${formattedDate}<div class="key-events__time">${formattedTime}</div>`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/vgt-table';
@import '../assets/css/components/satellite-block';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
@import '../assets/css/pages/key-events';
</style>
