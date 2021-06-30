<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h4 class="card-title mb-0">Permissions</h4>
      <b-button v-b-modal.addPermission variant="primary" class="shadow-bottom" size="sm">
        <b-icon-plus-circle class="mr-2"/>
        Add Permission
      </b-button>
    </div>
    <b-table :busy="permissions.loading" show-empty outlined thead-class="shadow-bottom" :fields="fields"
             :items="permissions.results">
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
    <pagination :call="call" :next="permissions.next" :previous="permissions.previous" :total="permissions.count"/>
    <b-modal lazy id="addPermission" title="Add Permission" size="lg" centered hide-footer>
      <template #default="{cancel,close}">
        <PermissionForm @close="close"></PermissionForm>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";

export default {
  name: "ApplicationPermissions",
  components: {
    PermissionForm: () => import("../Permission/PermissionForm"),
    TableLoader,
    Pagination
  },
  created() {
    this.getPermissions({id: this.$route.params.application_id})
  },
  methods: {
    ...mapActions('applications', ['getPermissions']),
    call(params) {
      this.getPermissions({id: this.$route.params.application_id, ...params})
    }
  },
  computed: {
    ...mapState('applications', ['permissions']),
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
          label: 'Permission Name',
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
