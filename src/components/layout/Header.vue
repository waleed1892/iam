<template>
  <b-navbar id="header" class="justify-content-between">
    <b-navbar-brand>
      <img src="/images/logo.svg" alt="">
    </b-navbar-brand>
    <b-navbar-nav id="navbar" class="py-3 px-1">
      <b-nav-item link-classes="px-5" :to="{name: 'Dashboard'}">Dashboard</b-nav-item>
      <b-nav-item link-classes="px-5" :to="{name: 'Applications'}">Applications</b-nav-item>
      <b-nav-item-dropdown no-caret :toggle-class="[$route.path.includes('/directory') ? 'router-link-active' : '']">
        <template #button-content>
          <span class="px-5">Directory</span>
        </template>
        <b-dropdown-item :to="{name: 'People'}">People</b-dropdown-item>
        <b-dropdown-item :to="{name: 'Groups'}">Groups</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item link-classes="px-5" :to="{name: 'Users'}">Users</b-nav-item>
      <b-nav-item :to="{name: 'Integrations'}" link-classes="px-5">Integrations</b-nav-item>
      <b-nav-item :to="{name: 'Settings'}" link-classes="px-5">Settings</b-nav-item>
    </b-navbar-nav>
    <b-link id="appsLink" to="/">
      <div class="d-flex align-items-center">
        <div class="text-black-50 mr-3">My Apps</div>
        <b-icon-play-circle-fill/>
      </div>
    </b-link>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style>
</style>
