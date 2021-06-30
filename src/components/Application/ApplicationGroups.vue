<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h4 class="card-title mb-0">Groups</h4>
      <b-button variant="primary" class="shadow-bottom" size="sm">
        <b-icon-plus-circle class="mr-2"/>
        Add Group
      </b-button>
    </div>
    <b-table :busy="groups.loading" show-empty outlined thead-class="shadow-bottom" :fields="fields"
             :items="groups.results">

    </b-table>
    <pagination :call="call" :next="groups.next" :previous="groups.previous" :total="groups.count"/>
  </div>
</template>

<script>
import Pagination from "../pagination";
import {mapState, mapActions} from "vuex";

export default {
  name: "ApplicationGroups",
  components: {Pagination},
  created() {
    this.getGroups({application_id: this.$route.params.application_id})
  },
  methods: {
    ...mapActions('applications', ['getGroups']),
    call(params) {
      this.getGroups({application_id: this.$route.params.application_id, ...params})
    }
  },
  computed: {
    ...mapState('applications', ['groups']),
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
