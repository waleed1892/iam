<template>
  <div>
    <b-form-group class="mx-2 my-2" label-cols="4" content-cols="8" label="Search Permission">
      <b-input @input="searchPermission" v-model="search" placeholder="Permission Name"/>
    </b-form-group>
    <b-table :busy="unassignedPermissions.loading" small head-variant="dark" bordered :fields="fields"
             :items="unassignedPermissions.results" show-empty>
      <template #cell(actions)="data">
        <b-checkbox :value="data.item.id" v-model="permissions" switch/>
      </template>
      <template #table-busy>
        <table-loader/>
      </template>
    </b-table>
    <b-pagination size="sm" align="center" @change="changePage" :total-rows="unassignedPermissions.count"
                  :value="unassignedPermissions.current_page"/>
    <b-alert variant="danger" class="mx-2" :show="error">Select a permission to save</b-alert>
    <div class="text-right px-4 my-4">
      <b-button @click="save" variant="primary" class="shadow-bottom mr-3" size="sm">Save</b-button>
      <slot name="cancel"></slot>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import TableLoader from "../tableLoader";
import debounce from "lodash.debounce";

export default {
  name: "UserApplicationPermissionsForm",
  components: {TableLoader},
  data() {
    return {
      search: '',
      permissions: [],
      error: false
    }
  },
  created() {
    this.getUnassignedPermissions({
      user_id: this.$route.params.user_id,
      application_id: this.$route.params.application_id
    })
  },
  methods: {
    ...mapActions('users', ['getUnassignedPermissions', 'assignPermissions']),
    searchPermission: debounce(function () {
      this.getUnassignedPermissions({
        user_id: this.$route.params.user_id,
        application_id: this.$route.params.application_id,
        search: this.search
      })
    }, 500),
    async save() {
      if (!this.permissions.length) {
        this.error = true;
        return;
      }
      await this.assignPermissions({
        user_id: this.$route.params.user_id,
        app_id: this.$route.params.application_id,
        permission_ids: this.permissions
      })
      const makeToast = await import('../../helpers/toastMessages').then(mod => mod.makeToast.bind(this))
      makeToast('Permissions assigned', 'success')
      this.$emit('saved')
    },
    changePage(page) {
      this.getUnassignedPermissions({
        user_id: this.$route.params.user_id,
        application_id: this.$route.params.application_id,
        page
      })
    }
  },
  computed: {
    ...mapState('users', ['unassignedPermissions']),
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
