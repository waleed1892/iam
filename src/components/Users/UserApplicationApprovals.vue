<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h4 class="card-title mb-0">Assigned Approvals</h4>
      <b-button v-b-modal.assignApproval variant="primary" class="shadow-bottom" size="sm">
        <b-icon-plus-circle/>
        Add Approval
      </b-button>
    </div>
    <b-table :busy="approvals.loading" outlined thead-class="shadow-bottom" :fields="fields" :items="approvals.results">
      <template #table-busy>
        <table-loader/>
      </template>
    </b-table>
    <pagination :call="call" :total="approvals.count" :next="approvals.next" :previous="approvals.previous"/>
    <b-modal centered hide-header body-class="p-0" hide-footer lazy id="assignApproval">
      <template #default="{cancel}">
        <UserApplicationApprovalsForm>
          <template #cancel>
            <b-button @click="cancel" size="sm" class="border shadow-bottom bg-white text-dark" variant="none">
              Cancel
            </b-button>
          </template>
        </UserApplicationApprovalsForm>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";

export default {
  name: "UserApplicationApprovals",
  components: {
    TableLoader,
    Pagination,
    UserApplicationApprovalsForm: () => import("./UserApplicationApprovalsForm")
  },
  created() {
    this.getApprovals({id: this.$route.params.user_id})
  },
  methods: {
    ...mapActions('users', ['getApprovals']),
    call(params) {
      this.getApprovals({id: this.$route.params.user_id, ...params})
    }
  },
  computed: {
    ...mapState('users', ['approvals']),
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
