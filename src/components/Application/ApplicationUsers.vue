<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 class="card-title mb-0">Users</h4>
      <div>
        <b-button v-b-modal.addUser variant="primary" class="shadow-bottom border-primary mr-2" size="sm">
          <b-icon-plus-circle class="mr-2"/>
          Add User
        </b-button>
        <b-button v-b-modal.filterUser size="sm" class="border shadow-bottom bg-white text-dark">
          <b-icon-search/>
          Filter
        </b-button>
      </div>
    </div>
    <search-criteria-bar @updateSearch="updateSearch" v-if="Object.keys(search).length" class="mt-4 mb-2"
                         :search="search"/>
    <div v-else class="mt-4"></div>
    <b-table :busy="users.loading" show-empty outlined thead-class="shadow-bottom" :fields="fields"
             :items="users.results">
      <template #cell(username)="data">
        <router-link
            :to="{name: 'ApplicationUser',params: {user_id: data.item.id,application_id:$route.params.application_id}}"
            class="username">{{
            data.item.username
          }}
        </router-link>
        <div class="text-black-50">{{ data.item.email }}</div>
      </template>
      <template #cell(is_active)="data">
                <span
                    class="status"
                    :class="[data.item.is_active ? 'active' : 'cancel']">{{
                    data.item.is_active ? 'active' : 'cancel'
                  }}</span>
      </template>
      <template #table-busy>
        <table-loader/>
      </template>
    </b-table>
    <pagination :next="users.next" :previous="users.previous" :call="call" :total="users.count"/>
    <b-modal lazy id="addUser" title="Add User" size="lg" centered hide-footer>
      <template #default="{close}">
        <PersonForm @close="close"></PersonForm>
      </template>
    </b-modal>
    <b-modal lazy id="filterUser" title="Add User" size="lg" centered hide-footer>
      <template #default="{close}">
        <FilterForm @updateSearch="updateSearch" :search="search" @close="close"></FilterForm>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";

export default {
  name: "ApplicationUsers",
  components: {
    SearchCriteriaBar: () => import("../searchCriteriaBar"),
    FilterForm: () => import("../People/FilterForm"),
    PersonForm: () => import('../People/PersonForm'),
    TableLoader,
    Pagination,
  },
  data() {
    return {}
  },
  created() {
    this.getApplicationUsers({id: this.$route.params.application_id})
  },
  methods: {
    ...mapActions('applications', ['getApplicationUsers']),
    ...mapMutations('applications', ['setSearch']),
    call(params) {
      this.getApplicationUsers({id: this.$route.params.application_id, ...params})
    },
    updateSearch(search) {
      this.setSearch(search)
      this.getApplicationUsers({id: this.$route.params.application_id})
    }
  },
  computed: {
    ...mapState('applications', ['users', 'search']),
    fields: function () {
      return [
        {
          key: 'id',
          label: '#',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'username',
          label: 'Person & Username',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'email',
          label: 'Primary Email',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'nationality',
          label: 'Nationality',
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
  },
}
</script>

<style scoped>

</style>
