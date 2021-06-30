<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h4 class="card-title mb-0">General</h4>
    </div>
    <b-table show-empty outlined thead-class="shadow-bottom" :fields="fields" :items="[]">

    </b-table>
    <pagination/>
  </div>
</template>

<script>
import Pagination from "../pagination";

export default {
  name: "ApplicationGeneral",
  components: {Pagination},
  computed: {
    fields() {
      return [
        {
          key: 'serial',
          label: '#',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'name',
          label: 'Name',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'users',
          label: 'People',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'dirs',
          label: 'Directories',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
