<template>
  <Page title="Key Events">
    <div slot="header" class="page__top">
      <p class="page__desc">
        Key Events are automatically highilighted activities that are unique and
        likely to be of particular interest. Currently, this list only includes
        rendezvous and proximity operation activities in the geosynchronous
        region.
      </p>
      <p class="page__sub-desc">
        The event summaries shown here are a function of the underlying data,
        which may be missing, incomplete, or have significant uncertainty. Learn
        more about the Dashboard's
        <nuxt-link to="/methodology">methodology</nuxt-link> here.
      </p>
      <StatusTypesLegend />
    </div>
    <section class="post__content">
      <div class="key-events__filters">
        <div class="key-events__search">
          <label for="search" class="form__label"
            >Search by Object Name or ID</label
          >
          <input
            id="search"
            v-model="searchTerm"
            class="form__input form__input--light"
            type="text"
            placeholder="Search"
          />
          <div class="key-events__search-btns">
            <Button :on-click="clearSearch" :disabled="searchTerm == ''"
              >Clear</Button
            >
            <Button class="btn--apply" :on-click="searchTable">
              <Icon id="check" name="check" />
              Apply
            </Button>
          </div>
        </div>
        <div class="key-events__date">
          <label class="form__label">Search Events between these Dates</label>
          <client-only>
            <date-picker
              v-model="selectedDate"
              placeholder="Select Date Range"
              format="MMM D, YYYY"
              prefix-class="sd"
              input-class="datepicker__input form__input form__input--light"
              range
              range-separator=" - "
              @input="filterDates"
            >
              <template v-slot:icon-calendar>
                <Icon id="calendar" name="calendar" />
              </template>
            </date-picker>
          </client-only>
        </div>
        <ul class="key-events__legend" role="list">
          <li>
            <strong>{{ formatNumber(totalRecords) }}</strong> events
          </li>
          <li>
            <strong style="font-style: italic;">P</strong>: Predicted Date
          </li>
        </ul>
      </div>
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
            <div
              v-html="formatDate(props.row.time_of_close_approach)"
              :data-prediction="props.row.is_prediction == '1' ? true : false"
            ></div>
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
          <template v-else-if="props.column.field === 'min_distance'">
            {{ formatNumber(props.row.min_distance) }}
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
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'
import StatusTypesLegend from '~/components/global/StatusTypesLegend'

export default {
  layout: 'layout',
  components: {
    Page,
    Button,
    Icon,
    StatusTypesLegend
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
      searchTerm: '',
      selectedDate: null,
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
          tdClass: 'text--right'
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
    },
    formatNumber(value) {
      return Number(value).toLocaleString('en-US')
    },
    clearSearch() {
      this.searchTerm = ''
    },
    searchTable() {
      console.log('search the table')
      // if searching for text, need to associate it with an id
      // search is server side, send over parameters
      // update API to accept search term
    },
    filterDates() {
      // Reset the date if we didn't select a date range
      if (this.selectedDate[0] === null) {
        this.updateParams({ startDate: null, endDate: null })
        this.loadItems()
        return
      }

      const dates = this.selectedDate.map((d) => {
        const month = (d.getMonth() + 1).toString().padStart(2, '0')
        const day = d
          .getDate()
          .toString()
          .padStart(2, '0')
        return `${d.getFullYear()}-${month}-${day}`
      })
      this.updateParams({ startDate: dates[0], endDate: dates[1] })
      this.loadItems()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/vgt-table';
@import '~/assets/css/components/datepicker';
@import '../assets/css/components/satellite-block';
@import '../assets/css/pages/post-content';
@import '../assets/css/pages/page';
@import '../assets/css/pages/key-events';
</style>
