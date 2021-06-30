<template>
  <b-row no-gutters class="border my-2">
    <b-col md="3" class="border-left border-right">
      <div class="text-center text-black-50 mt-3">App Categories</div>
      <ul class="list-unstyled text-center mt-4 app_categories">
        <li><a @click.prevent="changeAppType('')" href="" :class="[type===''? 'active' : '']"
               class="d-block py-1 border">All</a>
        </li>
        <li><a @click.prevent="changeAppType('branded')" href="" :class="[type==='branded'? 'active' : '']"
               class="d-block py-1 border">Branded</a></li>
        <li><a @click.prevent="changeAppType('custom')" href="" :class="[type==='custom'? 'active' : '']"
               class="d-block py-1 border">Custom</a></li>
      </ul>
    </b-col>
    <b-col md="9" class="bg-white">
      <div class="mt-3 px-4">
        <b-input @input="searchApplication" v-model="search" size="sm" placeholder="Search"/>
        <div v-if="applications.loading" class="h-100 min-vh-100 d-flex align-items-center justify-content-center">
          <table-loader />
        </div>
        <b-row v-else class="my-5 applications">
          <b-col md="4" v-for="application in applications.results" :key="application.id">
            <router-link :to="{name: 'Application',params:{application_id:application.id}}" class="application">
              <div class="img-container">
                <img :src="application.logo" alt="">
              </div>
              <div>{{ application.name }}</div>
            </router-link>
          </b-col>
        </b-row>
        <pagination :total="applications.count" :next="applications.next" :previous="applications.previous" :call="call"
                    class="mb-2"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Pagination from "../pagination";
import debounce from "lodash.debounce";
import TableLoader from "../tableLoader";

export default {
  name: "AllApplications",
  components: {TableLoader, Pagination},
  data() {
    return {
      search: '',
      type: ''
    }
  },
  created() {
    this.getApplications({});
  },
  methods: {
    ...mapActions("applications", ['getApplications']),
    call(params) {
      this.getApplications({...params, app_type: this.type})
    },
    searchApplication: debounce(function () {
      this.getApplications({search: this.search})
    }, 500),
    changeAppType(type) {
      this.type = type;
      this.getApplications({app_type: this.type})
    }
  },
  computed: {
    ...mapState("applications", ['applications'])
  }
}
</script>

<style scoped lang="scss">

</style>
