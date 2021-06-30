<template>
  <b-tabs content-class="flex-grow-1" class="sidebarTabs bg-white min-vh-100 h-100 d-flex flex-column">
    <b-tab title-link-class="py-3">
      <template #title>
        <img src="/images/applications.svg" alt="">
      </template>
      <ul id="applications" class="list-unstyled py-3 px-3 flex-grow-1 sidebarList">
        <li v-for="application in applications" :key="application.id"
            class="mb-2" :class="[Number($route.params.application_id)===application.id ? 'active' : '']">
          <router-link
              class="d-block rounded px-3 py-2 text-capitalize text-decoration-none font-semibold"
              :to="{name: 'Application',params: {id: application.id}}">
            <div class="d-inline-block img-container mr-2">
              <img :src="application.logo" alt="">
            </div>
            <span>{{ application.name }}</span>
          </router-link>
        </li>
      </ul>
      <b-pagination @change="changePage" :value="applications.current_page" size="sm"
                    class="mx-2 mb-2 shadow-bottom border sidebarPagination" :total-rows="applications.count"/>
    </b-tab>
    <b-tab title-link-class="py-3">
      <template #title>
        <img src="/images/groups.svg" alt="">
      </template>
    </b-tab>
    <b-tab title-link-class="py-3">
      <template #title>
        <b-icon-person-fill variant="dark"/>
      </template>
    </b-tab>
    <b-tab title-link-class="py-3">
      <template #title>
        <img src="/images/settings.svg" alt="">
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UserApplicationsSidebar",
  props: {
    hideHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('users', ['applications'])
  },
  methods: {
    changePage() {

    }
  }
}
</script>

<style scoped lang="scss">

@import "@/assets/styles/scss/app.scss";

h1 {
  font-size: 18px;
}
</style>
