<template>
  <div>
    <b-form-group class="mx-2 my-2" label-cols="4" content-cols="8" label="Search Role">
      <b-input @input="searchRole" v-model="search" placeholder="Role Name"/>
    </b-form-group>
    <b-table :busy="unassignedRoles.loading" small head-variant="dark" bordered :fields="fields"
             :items="unassignedRoles.results"
             show-empty>
      <template #cell(actions)="data">
        <b-checkbox :value="data.item.id" v-model="roles" switch/>
      </template>
      <template #table-busy>
        <table-loader/>
      </template>
    </b-table>
    <b-pagination @change="changePage" size="sm" align="center" :value="unassignedRoles.current_page"
                  :total-rows="unassignedRoles.count"/>
    <b-alert variant="danger" class="mx-2" :show="error">Select a role to save</b-alert>
    <div class="text-right px-4 my-4">
      <b-button @click="save" variant="primary" class="shadow-bottom mr-3" size="sm">Save</b-button>
      <slot name="cancel"></slot>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import TableLoader from "../tableLoader";

import debounce from 'lodash.debounce'

export default {
  name: "UserApplicationRolesForm",
  components: {TableLoader},
  data() {
    return {
      search: '',
      roles: [],
      error: false
    }
  },
  created() {
    this.getUnassignedRoles({
      user_id: this.$route.params.user_id,
      application_id: this.$route.params.application_id,
    })
  },
  methods: {
    ...mapActions('users', ['getUnassignedRoles', 'assignRoles']),
    searchRole: debounce(function () {
      this.getUnassignedRoles({
        user_id: this.$route.params.user_id,
        application_id: this.$route.params.application_id,
        search: this.search
      })
    }, 500),
    async save() {
      if (!this.roles.length) {
        this.error = true;
        return;
      }
      await this.assignRoles({
        user_id: this.$route.params.user_id,
        app_id: this.$route.params.application_id,
        role_ids: [...this.roles]
      })
      this.$emit('saved')
    },
    changePage(page) {
      this.getUnassignedRoles({
        user_id: this.$route.params.user_id,
        application_id: this.$route.params.application_id,
        page
      })
    }
  },
  computed: {
    ...mapState('users', ['unassignedRoles']),
    fields: function () {
      return [
        {
          key: 'name',
          label: 'Name',
          thClass: 'font-weight-light text-center',
          class: 'align-middle text-center'
        },
        {
          key: 'actions',
          label: 'Actions',
          thClass: 'font-weight-light text-center',
          class: 'align-middle text-center'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
