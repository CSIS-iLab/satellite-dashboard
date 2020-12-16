<template>
  <div class="filter-results">
    <h3 class="filter-results__total">{{ totalResults }} results</h3>
    <div class="filter-results__sort">Sort</div>
    <p v-if="totalResults === 0" class="filter-results__no-results">
      No objects with found that satisfied the filters applied. Try changing
      your selections or removing a filter.
    </p>
    <vue-good-table
      v-if="totalResults > 0"
      :columns="columns"
      :rows="satellites"
      :pagination-options="{
        enabled: totalResults > 75 ? true : false,
        mode: 'pages',
        perPage: 75
      }"
      :sort-options="{
        enabled: false
      }"
      style-class="vgt-table striped"
    >
      <template slot="table-column" slot-scope="props">
        <div
          v-if="props.column.field == 'Name'"
          class="sat__basic sat__basic--status"
        >
          <div class="sat__name">
            {{ props.column.label }}
          </div>
        </div>
        <span v-else>
          {{ props.column.label }}
        </span>
      </template>
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'Name'">
          <div
            class="sat__basic sat__basic--status"
            :data-status="props.row.Status"
          >
            <div class="sat__name">
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div class="sat__id">{{ props.row.catalog_id }}</div>
          </div>
        </div>
        <div v-else-if="props.column.field == 'actions'">
          <Button :on-click="highlightOrbit">
            <Icon id="orbit" class="icon" name="orbit" />
          </Button>
          <Button :on-click="togglePinState">
            <Icon id="unpin" class="icon" name="unpin" />
          </Button>
        </div>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import Button from '~/components/global/Button.vue'
import Icon from '~/components/global/Icon.vue'

export default {
  name: 'FilterResults',
  components: {
    Button,
    Icon
  },
  props: {
    satellites: {
      type: Array,
      required: true
    },
    totalResults: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      columns: [
        { label: 'Name/Norad ID', field: 'Name' },
        { label: 'CO.', field: 'country' },
        { label: '', field: 'actions', tdClass: 'sat__actions' }
      ]
    }
  },
  methods: {
    highlightOrbit() {
      console.log('highlight orbit')
    },
    togglePinState() {
      console.log('toggle the pin state')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/components/filter-results';
@import '../assets/css/components/satellite-block';
</style>
