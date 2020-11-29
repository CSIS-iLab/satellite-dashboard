<template>
  <Page title="Analysis">
    <div slot="header">
      <p class="page__desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat ornare
        dictum ut arcu diam morbi mi rutrum aliquet. Varius molestie eros
        scelerisque convallis ornare sociis fusce mauris. Vitae ut etiam purus
        in mattis tristique feugiat tellus lacinia.
      </p>
    </div>
    <div>
      <template v-if="loading">
        Loading...
      </template>

      <template v-else>
        <CesiumViewer :satellites="satellites" />
        <!--<table border="1" borderColor="#fff" cellSpacing="0">
          <thead>
            <tr>
              <td>Catalog Id</td>
              <td>Name</td>
              <td>Orbital Data</td>
            </tr>
          </thead>
          <tr v-for="sat in satellites" :key="sat.id">
            <td>{{ sat.catalog_id }}</td>
            <td>{{ sat.source1.Name }}</td>
            <td>{{ sat.orbital }}</td>
          </tr>
        </table>-->
      </template>
    </div>
  </Page>
</template>

<script>
import CesiumViewer from '~/components/visualizer/CesiumViewer'
import Page from '~/layout/page'

export default {
  layout: 'visualizer',
  components: {
    Page,
    CesiumViewer
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    satellites() {
      return this.$store.state.satellites.satellites
    }
  },
  created() {
    this.$store.dispatch('satellites/getSatellites')
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '../assets/css/pages/visualizer';

table {
  color: #fff;
  border-collapse: collapse;

  td {
    padding: 8px;
    vertical-align: top;
  }
}
</style>
