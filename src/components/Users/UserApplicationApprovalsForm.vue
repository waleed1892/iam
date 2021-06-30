<template>
  <div>
    <b-form-group class="mx-2 my-2" label-cols="4" content-cols="8" label="Search Role">
      <b-input v-model="search" placeholder="Permission Name"/>
    </b-form-group>
    <b-table small head-variant="dark" bordered :fields="fields" :items="[]" show-empty>
      <template #cell(actions)>
        <b-checkbox switch/>
      </template>
    </b-table>
    <div class="text-right px-4 my-4">
      <b-button variant="primary" class="shadow-bottom mr-3" size="sm">Save</b-button>
      <slot name="cancel"></slot>
    </div>
  </div>
</template>

<script>
// import {mapState, mapActions} from "vuex";

export default {
  name: "UserApplicationApprovalsForm",
  data() {
    return {
      search: ''
    }
  },
  methods: {},
  computed: {
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
