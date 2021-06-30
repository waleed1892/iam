<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h4 class="card-title mb-0">Assigned Roles</h4>
      <b-button v-b-modal.assignUserRole variant="primary" class="shadow-bottom" size="sm">
        <b-icon-plus-circle/>
        Add Role
      </b-button>
    </div>
    <b-table :busy="roles.loading" outlined thead-class="shadow-bottom" table-class="rounded" :fields="fields"
             :items="roles.results">
      <template #table-busy>
        <table-loader/>
      </template>
      <template #cell(actions)="data">
        <div class="d-flex align-items-center">
          <b-link @click="setRoleId(data.item.id)" v-b-modal.confirmDelete>
            <b-icon-trash font-scale="1.3" class="text-danger"/>
          </b-link>
        </div>
      </template>
    </b-table>
    <pagination :call="call" :total="roles.count" :next="roles.next" :previous="roles.previous"/>
    <b-modal centered hide-header body-class="p-0" hide-footer lazy id="assignUserRole">
      <template #default="{cancel,hide}">
        <UserApplicationRolesForm @saved="hide()">
          <template #cancel>
            <b-button @click="cancel" size="sm" class="border shadow-bottom bg-white text-dark" variant="none">
              Cancel
            </b-button>
          </template>
        </UserApplicationRolesForm>
      </template>
    </b-modal>
    <confirm-alert @accept="deleteRole" id="confirmDelete">
      Are you sure?
    </confirm-alert>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";
import ConfirmAlert from "../confirmAlert";

export default {
  name: "UserApplicationRoles",
  data() {
    return {
      deletedRoles: []
    }
  },
  components: {
    ConfirmAlert,
    TableLoader,
    Pagination,
    UserApplicationRolesForm: () => import('./UserApplicationRolesForm')
  },
  created() {
    this.getRoles({id: this.$route.params.user_id})
  },
  methods: {
    ...mapActions('users', ['getRoles', 'unAssignRoles']),
    call(params) {
      this.getRoles({id: this.$route.params.user_id, ...params})
    },
    /**
     * Delete user roles with id's
     */
    async deleteRole() {
      const data = {
        app_id: this.$route.params.application_id,
        user_id: this.$route.params.user_id,
        role_ids: this.deletedRoles
      }
      await this.unAssignRoles(data)
      this.deletedRoles = []
    },
    /**
     * store role id's to delete
     * @param id
     */
    setRoleId(id) {
      const deletedRoles = [...this.deletedRoles]
      deletedRoles.push(id)
      this.deletedRoles = deletedRoles
    }
  },
  computed: {
    ...mapState('users', ['roles']),
    fields: function () {
      return [
        {
          key: 'id',
          label: '#',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
        {
          key: 'name',
          label: 'Role Name',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
        {
          key: 'description',
          label: 'Desc.',
          thClass: 'font-weight-light',
          class: 'align-middle',
          formatter(value) {
            return !value ? '' : value.substring(0, 30) + '...'
          }
        },
        {
          key: 'system_assign_on',
          label: 'Assigned On',
          thClass: 'font-weight-light',
          class: 'align-middle',
          formatter(value) {
            return new Date(value).getDate()
          }
        },
        {
          key: 'system_assign_by',
          label: 'Assigned By',
          thClass: 'font-weight-light',
          class: 'align-middle'
        },
        {
          key: 'actions',
          label: 'Actions',
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
