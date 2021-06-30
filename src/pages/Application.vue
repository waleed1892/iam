<template>
  <b-row no-gutters>
    <b-col md="2">
      <ApplicationsSidebar/>
    </b-col>
    <b-col md="10">
      <div class="d-flex justify-content-between p-3 border-bottom">
        <router-link class="text-black-50" :to="{name: 'Applications'}">
          <b-icon-arrow-left/>
          Back to Applications
        </router-link>
        <img src="/images/filter.svg" alt="">
      </div>
      <div class="p-4">
        <ApplicationHeader :key="$route.params.application_id"/>
        <b-tabs no-fade class="mt-4" nav-wrapper-class="custom-tabs" id="applicationTabs">
          <b-tab lazy title="Users">
            <b-card>
              <ApplicationUsers :key="$route.params.application_id"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Roles">
            <b-card>
              <ApplicationRoles :key="$route.params.application_id"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Permissions">
            <b-card>
              <ApplicationPermissions :key="$route.params.application_id"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="General">
            <b-card>
              <ApplicationGeneral :key="$route.params.application_id"/>
            </b-card>
          </b-tab>
          <b-tab lazy title="Groups">
            <b-card>
              <ApplicationGroups :key="$route.params.application_id"/>
            </b-card>
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {mapActions, mapState} from "vuex";

import ApplicationsSidebar from "../components/Applications/ApplicationsSidebar";
import ApplicationHeader from "../components/Application/ApplicationHeader";
import ApplicationUsers from "../components/Application/ApplicationUsers";

export default {
  name: "Application",
  components: {
    ApplicationUsers,
    ApplicationHeader,
    ApplicationsSidebar,
    ApplicationRoles: () => import('../components/Application/ApplicationRoles'),
    ApplicationPermissions: () => import('../components/Application/ApplicationPermissions'),
    ApplicationGroups: () => import('../components/Application/ApplicationGroups'),
    ApplicationGeneral: () => import('../components/Application/ApplicationGeneral')
  },
  created() {
    this.getApplication(this.$route.params.application_id)
  },
  updated() {
    this.getApplication(this.$route.params.application_id)
  },
  methods: {
    ...mapActions('applications', ['getApplication', 'getApplicationUsers']),
  },
  computed: {
    ...mapState('applications', ['application', 'search'])
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

<style scoped lang="scss">
</style>
