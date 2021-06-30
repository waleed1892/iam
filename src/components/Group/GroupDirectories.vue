<template>
  <div>
    <b-table :busy="directories.loading" show-empty bordered :items="directories.results" :fields="fields">

    </b-table>
    <pagination class="p-3"/>
  </div>
</template>

<script>
import Pagination from "../pagination";
import {mapState} from "vuex";

export default {
  name: "GroupDirectories",
  components: {Pagination},
  computed: {
    ...mapState('groups', ['directories']),
    fields(){
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
