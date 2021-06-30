<template>
  <div class="h-100 bg-white d-flex flex-column justify-content-between">
    <b-table :busy="users.loading" tbody-tr-class="align-middle" bordered show-empty :fields="fields"
             :items="users.results">
      <template #cell(username)="data">
        <router-link :to="{name: 'User',params: {user_id:data.item.id}}" class="username">{{
            data.item.username
          }}
        </router-link>
        <div class="text-black-50">{{ data.item.email }}</div>
      </template>
      <template #cell(status)="data">
                <span
                    class="status"
                    :class="[data.item.status==='active' ? 'active' : 'cancel']">{{
                    data.item.status
                  }}</span>
      </template>
      <template #table-busy>
        <table-loader/>
      </template>
    </b-table>
    <pagination :call="call" :next="users.next" :previous="users.previous" :total="users.count" class="p-3"/>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";

export default {
  name: "PeopleListing",
  components: {TableLoader, Pagination},
  created() {
    this.getUsers({});
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    call(params) {
      this.getUsers(params)
    }
  },
  computed: {
    ...mapState('users', ['users']),
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
          key: 'is_active',
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
