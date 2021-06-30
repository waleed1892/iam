<template>
  <b-row no-gutters>
    <b-col md="2">
      <UsersSidebar/>
    </b-col>
    <b-col md="10">
      <div class="d-flex justify-content-between p-3 border-bottom">
        <router-link class="text-black-50" :to="{name: 'People'}">
          <b-icon-arrow-left/>
          Back to People
        </router-link>
        <img src="/images/filter.svg" alt="">
      </div>
      <div class="mt-4 mr-3">
        <b-tabs no-fade nav-wrapper-class="custom-tabs" id="usersTabs" small>
          <b-tab lazy>
            <template #title><img class="mr-2" src="/images/applications.svg" alt="">Applications</template>
            <b-card body-class="px-0">
              <template #default>
                <div class="d-flex align-items-center justify-content-between px-3 tab-header pb-3">
                  <h4 class="card-title mb-0">Enrolled Applications</h4>
                  <b-button size="sm" variant="primary" class="shadow-bottom">
                    <b-icon-plus-circle class="mr-2"/>
                    <span class="align-middle">Add Apps</span>
                  </b-button>
                </div>
                <UserApplications :key="$route.params.user_id"/>
              </template>
            </b-card>
          </b-tab>
          <b-tab lazy>
            <template #title><img class="mr-2" src="/images/groups.svg" alt="">Groups</template>
            <b-card body-class="px-0">
              <template #default>
                <div class="d-flex align-items-center justify-content-between px-3 tab-header pb-3">
                  <h4 class="card-title mb-0">Assigned Group</h4>
                  <b-button size="sm" variant="primary" class="shadow-bottom">
                    <b-icon-grid3x3-gap-fill class="mr-2"/>
                    <span class="align-middle">Manage Apps</span>
                  </b-button>
                </div>
              </template>
            </b-card>
          </b-tab>
          <b-tab lazy>
            <template #title>
              <b-icon-person-fill class="mr-3"/>
              Profile
            </template>
            <b-card body-class="px-0">
              <div class="d-flex align-items-center justify-content-between px-3 tab-header pb-3">
                <h4 class="card-title mb-0">Profile</h4>
              </div>
              <Profile :key="$route.params.user_id"/>
            </b-card>
          </b-tab>
          <b-tab lazy>
            <template #title><img class="mr-2" src="/images/settings.svg" alt="">General</template>
            <b-card body-class="px-0">
              <template #default>
                <div class="d-flex align-items-center justify-content-between px-3 tab-header pb-3">
                  <h4 class="card-title mb-0">General</h4>
                </div>
              </template>
            </b-card>
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import UsersSidebar from "../components/Users/UsersSidebar";
import UserApplications from "../components/Users/UserApplications";

export default {
  name: "Users",
  components: {
    UserApplications,
    Profile: () => import("../components/Users/Profile"),
    UsersSidebar
  },
  async beforeRouteEnter(to, from, next) {
    if (from.path === '/') {
      const store = (await import('../store/index')).default;
      if (!store.state.users.users.length) {
        next({name: 'People'})
        await store.dispatch('users/getUsers', {})
        next({params: {user_id: Number(to.params.user_id)}})
      }
    } else
      next();
  }
}
</script>

<style scoped lang="scss">
</style>
