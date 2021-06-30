<template>
  <b-row class="p-5 applications">
    <b-col md="3" v-for="application in applications" :key="application.id">
      <router-link class="application" :to="{name: 'UserApplication',params: {application_id: 1}}">
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
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "UserApplications",
  created() {
    this.getApplications(this.$route.params.user_id)
  },
  methods: {
    ...mapActions('users', ['getApplications']),
  },
  computed: {
    ...mapState('users', ['applications'])
  }
}
</script>

<style scoped lang="scss">

</style>
