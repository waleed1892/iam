<template>
  <div>
    <div class="d-flex px-5 pt-5 pb-2">
      <div v-if="applications.loading" class="w-100">
        <table-loader/>
      </div>
      <b-row class="applications">
        <b-col md="3" v-for="application in applications.results" :key="application.id">
          <router-link class="application" :to="{name: 'Application' ,params: {application_id:application.id}}">
            <div class="img-container">
              <img class="img-fluid" :src="application.logo" alt="">
            </div>
            <div class="name">{{ application.name }}</div>
          </router-link>
          <div class="controls px-3 mt-3 d-flex justify-content-between">
            <b-button size="sm" variant="none" class="shadow-bottom border">
              <b-icon-pause-fill font-scale="1.5"/>
            </b-button>
            <b-button size="sm" variant="none" class="shadow-bottom border">
              <b-icon-pencil-fill font-scale="1.5"/>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div>
    <pagination class="p-3" :call="call" :total="applications.count" :next="applications.next"
                :previous="applications.previous"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Pagination from "../pagination";
import TableLoader from "../tableLoader";

export default {
  name: "GroupApplications",
  components: {TableLoader, Pagination},
  created() {
    this.getApplications({id: this.$route.params.id})
  },
  methods: {
    ...mapActions('groups', ['getApplications']),
    call(params) {
      this.getApplications({id: this.$route.params.id, ...params})
    }
  },
  computed: {
    ...mapState('groups', ['applications'])
  }
}
</script>

<style scoped>

</style>
