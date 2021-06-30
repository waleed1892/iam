<template>
  <div>
    <b-table :busy="activities.loading" outlined thead-class="shadow-bottom" :fields="fields"
             :items="activities.results">
      <template #table-busy>
        <table-loader/>
      </template>
    </b-table>
    <pagination :call="call" :total="activities.count" :next="activities.next" :previous="activities.previous"/>
  </div>

</template>

<script>
import {mapState, mapActions} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";

export default {
  name: "UserApplicationActivities",
  components: {TableLoader, Pagination},
  created() {
    this.getActivities({id: this.$route.params.user_id})
  },
  methods: {
    ...mapActions('users', ['getActivities']),
    call(params) {
      this.getActivities({id: this.$route.params.user_id, ...params})
    }
  },
  computed: {
    ...mapState('users', ['activities']),
    fields: function () {
      return [
        {
          key: 'id',
          label: '#',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
        {
          key: 'type',
          label: 'Type',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
        {
          key: 'date',
          label: 'Date',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
        {
          key: 'state',
          label: 'State',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
        {
          key: 'last_action',
          label: 'Last Action',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
