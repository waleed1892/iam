<template>
  <b-row no-gutters>
    <b-col md="2">
      <ApplicationsSidebar/>
    </b-col>
    <b-col md="2">
      <ApplicationUsersSidebar class="border-left" hide-header/>
    </b-col>
    <b-col md="8">
      <div class="d-flex justify-content-between p-3 pb-4 border-bottom">
        <router-link class="text-black-50"
                     :to="{name: 'Application',params:{id:$route.params.application_id}}">
          <b-icon-arrow-left/>
          Back to Users
        </router-link>
        <img src="/images/filter.svg" alt="">
      </div>
      <div class="mt-4 px-4">
        <b-tabs lazy no-fade class="mt-4" nav-wrapper-class="custom-tabs" id="applicationTabs">
          <b-tab title="Roles">
            <b-card class="rounded-0">
              <UserApplicationRoles :key="$route.params.user_id"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Permissions">
            <b-card class="rounded-0">
              <UserApplicationPermissions :key="$route.params.user_id" class="mt-4"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Activities">
            <b-card title="Activities" class="rounded-0">
              <UserApplicationActivities :key="$route.params.user_id" class="mt-4"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Approvals">
            <b-card class="rounded-0">
              <UserApplicationApprovals :key="$route.params.user_id"/>
            </b-card>
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import ApplicationsSidebar from "../components/Applications/ApplicationsSidebar";
import UserApplicationRoles from "../components/Users/UserApplicationRoles";
import ApplicationUsersSidebar from "../components/Application/ApplicationUsersSidebar";
import {mapMutations} from "vuex";

export default {
  name: "ApplicationUser",
  components: {
    ApplicationUsersSidebar,
    UserApplicationPermissions: () => import("../components/Users/UserApplicationPermissions"),
    UserApplicationApprovals: () => import("../components/Users/UserApplicationApprovals"),
    UserApplicationActivities: () => import("../components/Users/UserApplicationActivities"),
    UserApplicationRoles,
    ApplicationsSidebar,
  },
  created() {
    this.setUserId(this.$route.params.user_id)
  },
  updated() {
    this.setUserId(this.$route.params.user_id)
  },
  methods: {
    ...mapMutations('users', ['setUserId'])
  },
  async beforeRouteEnter(to, from, next) {
    if (from.path === '/') {
      const store = (await import('../store/index')).default;
      if (!store.state.applications.applications.length) {
        next({name: 'Applications'})
      }
    } else
      next();
  }
}
</script>

<style scoped>

</style>
