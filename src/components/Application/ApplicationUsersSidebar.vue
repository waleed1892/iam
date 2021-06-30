<template>
  <b-tabs content-class="flex-grow-1" class="sidebarTabs bg-white min-vh-100 d-flex flex-column h-100">
    <b-tab title-link-class="py-3">
      <template #title>
        <b-icon-person-circle/>
      </template>
      <ApplicationUsersSideList/>
    </b-tab>
    <b-tab title-link-class="py-3">
      <template #title>
        <b-icon-lock-fill variant="dark"/>
      </template>
      <ApplicationRolesSideList/>
    </b-tab>
    <b-tab title-link-class="py-3">
      <template #title>
        <img src="/images/safety-ring.svg" alt="">
      </template>
      <ApplicationPermissionsSideList/>
    </b-tab>
    <b-tab lazy title-link-class="py-3">
      <template #title>
        <img src="/images/settings.svg" alt="">
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import ApplicationRolesSideList from "./ApplicationRolesSideList";
import ApplicationUsersSideList from "./ApplicationUsersSideList";
import ApplicationPermissionsSideList from "./ApplicationPermissionsSideList";

export default {
  name: "ApplicationUsersSidebar",
  components: {ApplicationPermissionsSideList, ApplicationUsersSideList, ApplicationRolesSideList},
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 18px;
}
</style>
