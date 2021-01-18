<template>
  <div class="filter-results">
    <h3 class="filter-results__total">{{ totalResults }} results</h3>
    <div class="filter-results__sort form">
      <v-select
        v-model="currentSort"
        class="dropdown--simple"
        :clearable="false"
        :options="sortOptions"
        :searchable="false"
      >
        <template #selected-option="{ label }">
          <Icon id="sort" name="sort" />
          {{ label }}
        </template>
      </v-select>
    </div>
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
        perPage: 75,
        pageLabel: 'Page'
      }"
      :sort-options="{
        enabled: false,
        initialSortBy: { field: 'Name', type: 'asc' }
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
        <div v-else-if="props.column.field == 'actions'" class="sat__actions">
          <Button :on-click="highlightOrbit">
            <Icon id="orbit" name="orbit" />
          </Button>
          <Button
            v-if="checkItemFocusedState(props.row.catalog_id)"
            :on-click="(e) => removeFromFocused(e, props.row.catalog_id)"
          >
            <Icon id="pin" name="pin" />
          </Button>
          <Button
            v-else
            :on-click="(e) => addToFocused(e, props.row.catalog_id)"
          >
            <Icon id="unpin" name="unpin" />
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
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
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
        {
          label: 'Name/Norad ID',
          field: 'Name',
          thClass: 'filter-results__name',
          sortFn: this.sortFn
        },
        { label: 'CO.', field: 'country', sortFn: this.sortFn },
        { label: '', field: 'actions' }
      ],
      sortOptions: [
        { value: 'Name', label: 'Name' },
        { value: 'country', label: 'Country' }
      ],
      currentSort: 'Name'
    }
  },
  computed: {
    focusedItems() {
      return new Set(this.focusedSatellites)
    },
    ...mapGetters({
      focusedSatellites: 'satellites/focusedSatellites'
    })
  },
  methods: {
    highlightOrbit() {
      console.log('highlight orbit')
    },
    checkItemFocusedState(catalog_id) {
      return this.focusedItems.has(catalog_id)
    },
    removeFromFocused(e, catalog_id) {
      this.focusedItems.delete(catalog_id)
      this.updateFocusedSatellites(this.focusedItems)
    },
    addToFocused(e, catalog_id) {
      this.focusedItems.add(catalog_id)
      this.updateFocusedSatellites(this.focusedItems)
    },
    ...mapMutations({
      updateFocusedSatellites: 'satellites/updateFocusedSatellites'
    })
  }
}
</script>

<style lang="scss">
// @import '../assets/css/components/form-input';
@import '../assets/css/components/filter-results';
@import '../assets/css/components/satellite-block';
</style>
