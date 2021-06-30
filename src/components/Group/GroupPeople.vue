<template>
  <div class="bg-white h-100 d-flex flex-column justify-content-between">
    <b-table :busy="users.loading" tbody-tr-class="align-middle" bordered show-empty :fields="fields"
             :items="users.results">
      <template #cell(username)="data">
        <div class="username">{{ data.item.username }}</div>
        <div class="text-black-50">{{ data.item.email }}</div>
      </template>
      <template #table-busy>
        <table-loader/>
      </template>
      <template #cell(status)="data">
                <span
                    class="status"
                    :class="[data.item.is_active ? 'active' : 'cancel']">{{
                    data.item.is_active ? 'active' : 'cancel'
                  }}</span>
      </template>
    </b-table>
    <pagination class="p-3" :total="users.count" :next="users.next" :previous="users.previous" :call="call"/>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import TableLoader from "../tableLoader";
import Pagination from "../pagination";

export default {
  name: "GroupPeople",
  components: {Pagination, TableLoader},
  data() {
    return {}
  },
  created() {
    this.getUsers({id: this.$route.params.id})
  },
  methods: {
    ...mapActions('groups', ['getUsers']),
    call(params) {
      this.getUsers({id: this.$route.params.id, ...params})
    }
  },
  computed: {
    ...mapState('groups', ['users']),
    fields() {
      return [
        {
          key: 'id',
          label: 'ID',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'username',
          label: 'Persons & Username',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'email',
          label: 'Primary email',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'status',
          label: 'Status',
          thClass: 'font-semibold',
          class: 'align-middle'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

</style>
