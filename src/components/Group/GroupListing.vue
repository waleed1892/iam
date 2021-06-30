<template>
  <div class="h-100 bg-white d-flex flex-column justify-content-between">
    <b-table :busy="groups.loading" show-empty bordered :items="groups.results" :fields="fields">
      <template #table-busy>
        <table-loader/>
      </template>
      <template #cell(name)="data">
        <router-link class="text-primary" :to="{name: 'Group',params: {id: data.item.id}}">{{
            data.item.name
          }}
        </router-link>
        <div class="text-black-50">{{ data.item.description }}</div>
      </template>
      <template #cell(source)>
        <b-icon-record-circle-fill class="text-primary" font-scale="1.5"/>
      </template>
    </b-table>
    <pagination class="p-3" :call="call" :total="groups.count" :next="groups.next" :previous="groups.previous"/>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import TableLoader from "../tableLoader";
import Pagination from "../pagination";

export default {
  name: "GroupListing",
  components: {Pagination, TableLoader},
  created() {
    this.getGroups({})
  },
  methods: {
    ...mapActions('groups', ['getGroups']),
    call(params) {
      this.getGroups(params)
    }
  },
  computed: {
    ...mapState('groups', ['groups']),
    fields: function () {
      return [
        {
          key: 'source',
          label: 'Source',
          thClass: 'font-semibold',
          class: 'align-middle',
          tdClass: 'text-center'
        },
        {
          key: 'name',
          label: 'Group Name',
          class: 'align-middle'
        },
        {
          key: 'users',
          label: 'People',
          class: 'align-middle'
        },
        {
          key: 'apps',
          label: 'Apps',
          class: 'align-middle'
        },
        {
          key: 'dirs',
          label: 'Directories',
          class: 'align-middle'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
