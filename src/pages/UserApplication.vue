<template>
  <b-row no-gutters>
    <b-col md="2">
      <UsersSidebar/>
    </b-col>
    <b-col md="2">
      <UserApplicationsSidebar class="border-left" hide-header/>
    </b-col>
    <b-col md="8">
      <div class="d-flex justify-content-between p-3 pb-4 border-bottom">
        <router-link class="text-black-50" :to="{name: 'People'}">
          <b-icon-arrow-left/>
          Back to Users
        </router-link>
        <img src="/images/filter.svg" alt="">
      </div>
      <div class="mt-4 px-4">
        <ApplicationHeader hide-description/>
        <b-tabs no-fade class="mt-4" nav-wrapper-class="custom-tabs" id="applicationTabs">
          <b-tab lazy title="Roles">
            <b-card class="rounded-0">
              <UserApplicationRoles/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Permissions">
            <b-card class="rounded-0">
              <UserApplicationPermissions class="mt-4"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Activities">
            <b-card title="Activities" class="rounded-0">
              <UserApplicationActivities class="mt-4"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Approvals">
            <b-card class="rounded-0">
              <UserApplicationApprovals/>
            </b-card>
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {mapActions} from "vuex";

import UsersSidebar from "../components/Users/UsersSidebar";
import UserApplicationRoles from "../components/Users/UserApplicationRoles";
import UserApplicationsSidebar from "../components/Users/UserApplicationsSidebar";
import ApplicationHeader from "../components/Application/ApplicationHeader";

export default {
  name: "UserApplication",
  components: {
    ApplicationHeader,
    UserApplicationsSidebar,
    UserApplicationPermissions: () => import("../components/Users/UserApplicationPermissions"),
    UserApplicationApprovals: () => import("../components/Users/UserApplicationApprovals"),
    UserApplicationActivities: () => import("../components/Users/UserApplicationActivities"),
    UserApplicationRoles,
    UsersSidebar
  },
  created() {
    this.getApplication(this.$route.params.application_id)
  },
  methods: {
    ...mapActions('applications', ['getApplication'])
  },
  async beforeRouteEnter(to, from, next) {
    if (from.path === '/') {
      const store = (await import('../store/index')).default;
      if (!store.state.users.users.length) {
        next({name: 'People'})
      }
    } else
      next();
  }
}
</script>

<style scoped>

</style>
