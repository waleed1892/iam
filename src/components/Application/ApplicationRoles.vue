<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h4 class="card-title mb-0">Roles</h4>
      <b-button v-b-modal.addRole variant="primary" class="shadow-bottom" size="sm">
        <b-icon-plus-circle class="mr-2"/>
        Add Role
      </b-button>
    </div>
    <b-table :busy="roles.loading" show-empty outlined thead-class="shadow-bottom" :fields="fields"
             :items="roles.results">
      <template #cell(serial)="data">
        {{ data.index + 1 }}
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
    <pagination :next="roles.next" :previous="roles.previous" :call="call" :total="roles.count"/>
    <b-modal lazy id="addRole" title="Add Role" size="lg" centered hide-footer>
      <template #default="{close}">
        <RoleForm @close="close"></RoleForm>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";
import RoleForm from "../Role/RoleForm";

export default {
  name: "ApplicationRoles",
  components: {RoleForm, TableLoader, Pagination},
  created() {
    this.getRoles({id: this.$route.params.application_id})
  },
  methods: {
    ...mapActions('applications', ['getRoles']),
    call(params) {
      this.getRoles({id: this.$route.params.application_id, ...params})
    }
  },
  computed: {
    ...mapState('applications', ['roles']),
    fields() {
      return [
        {
          key: 'serial',
          label: '#',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'id',
          label: 'ID',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'name',
          label: 'Role Name',
          thClass: 'font-semibold',
          class: 'align-middle'
        },
        {
          key: 'description',
          label: 'Description',
          thClass: 'font-semibold',
          class: 'align-middle',
          formatter(value) {
            return !value ? '' : value.substring(0, 70) + '...'
          },
          thStyle: {
            width: '500px'
          }
        },
        {
          key: 'is_active',
          label: 'Status',
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
