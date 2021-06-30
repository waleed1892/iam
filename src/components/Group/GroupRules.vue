<template>
  <div class="h-100 bg-white d-flex flex-column justify-content-between">
    <b-table :busy="rules.loading" show-empty bordered :items="rules.results" :fields="fields"></b-table>
    <pagination class="p-3"/>
  </div>
</template>

<script>
import Pagination from "../pagination";
import {mapState} from "vuex";

export default {
  name: "GroupRules",
  components: {Pagination},
  computed: {
    ...mapState('groups', ['rules']),
    fields() {
      return [
        {
          key: 'serial',
          label: 'Serial',
          thClass: 'font-semibold',
          class: 'align-middle',
        },
        {
          key: 'name',
          label: 'Name',
          thClass: 'font-semibold',
          class: 'align-middle',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
