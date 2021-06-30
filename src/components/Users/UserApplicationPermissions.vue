<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h4 class="card-title mb-0">Assigned Permissions</h4>
      <b-button v-b-modal.assignPermission variant="primary" class="shadow-bottom" size="sm">
        <b-icon-plus-circle/>
        Add Permission
      </b-button>
    </div>
    <b-table :busy="permissions.loading" outlined thead-class="shadow-bottom" :fields="fields"
             :items="permissions.results">
      <template #table-busy>
        <table-loader/>
      </template>
      <template #cell(actions)="data">
        <div class="d-flex align-items-center">
          <b-link @click="setPermissionId(data.item.id)" v-b-modal.deletePermissionConfirm>
            <b-icon-trash font-scale="1.3" class="text-danger"/>
          </b-link>
        </div>
      </template>
    </b-table>
    <pagination :call="call" :total="permissions.count" :next="permissions.next" :previous="permissions.previous"/>
    <b-modal hide-header hide-footer body-class="p-0" centered id="assignPermission">
      <template #default="{cancel,hide}">
        <UserApplicationPermissionsForm @saved="hide()">
          <template #cancel>
            <b-button @click="cancel" size="sm" class="border shadow-bottom bg-white text-dark" variant="none">
              Cancel
            </b-button>
          </template>
        </UserApplicationPermissionsForm>
      </template>
    </b-modal>
    <confirm-alert id="deletePermissionConfirm" @accept="deletePermissions">
      Are you sure?
    </confirm-alert>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";
import ConfirmAlert from "../confirmAlert";

export default {
  name: "UserApplicationPermissions",
  data() {
    return {
      deletedPermissions: []
    }
  },
  components: {
    ConfirmAlert,
    TableLoader,
    Pagination,
    UserApplicationPermissionsForm: () => import("./UserApplicationPermissionsForm")
  },
  created() {
    this.getPermissions({id: this.$route.params.user_id})
  },
  methods: {
    ...mapActions('users', ['getPermissions', 'unAssignPermissions']),
    call(params) {
      this.getPermissions({id: this.$route.params.user_id, ...params})
    },
    setPermissionId(id) {
      const deletedPermissions = [...this.deletedPermissions]
      deletedPermissions.push(id)
      this.deletedPermissions = deletedPermissions
    },
    async deletePermissions() {
      const data = {
        app_id: this.$route.params.application_id,
        user_id: this.$route.params.user_id,
        permission_ids: this.deletedPermissions
      }
      await this.unAssignPermissions(data)
      const makeToast = await import('../../helpers/toastMessages').then(mod => mod.makeToast.bind(this))
      makeToast('Permission deleted', 'success')
      this.deletedPermissions = []
    }
  },
  computed: {
    ...mapState('users', ['permissions']),
    fields: function () {
      return [
        {
          key: 'id',
          label: '#',
          class: 'align-middle',
          thClass: 'font-weight-light'
        },
        {
          key: 'name',
          label: 'Permission Name',
          class: 'align-middle',
          thClass: 'font-weight-light'
        },
        {
          key: 'description',
          label: 'Desc.',
          class: 'align-middle',
          thClass: 'font-weight-light',
          formatter(value) {
            return !value ? '' : value.substring(0, 30) + '...'
          }
        },
        {
          key: 'system_assign_on',
          label: 'Assigned On',
          class: 'align-middle',
          thClass: 'font-weight-light',
          formatter(value) {
            return new Date(value).getDate()
          }
        },
        {
          key: 'assigned_by',
          label: 'Assigned By',
          class: 'align-middle',
          thClass: 'font-weight-light'
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'align-middle',
          thClass: 'font-weight-light'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
