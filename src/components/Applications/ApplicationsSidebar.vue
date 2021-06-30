<template>
  <div class="bg-white h-100 min-vh-100 d-flex flex-column">
    <h1 class="border-bottom font-semibold py-3 text-center">Applications</h1>
    <ul id="applications" class="list-unstyled py-3 px-3 flex-grow-1 sidebarList">
      <li v-for="application in applications.results" :key="application.id"
          class="mb-2" :class="[$route.params.application_id===application.id ? 'active' : '']">
        <router-link
            class="d-block rounded px-2 py-2 text-capitalize text-decoration-none font-semibold"
            :to="{name: 'Application',params: {application_id: application.id}}">
          <div class="d-inline-block img-container mr-2">
            <img :src="application.logo" alt="">
          </div>
          <span>{{ application.name }}</span>
        </router-link>
      </li>
    </ul>
    <b-pagination @change="changePage" :value="applications.current_page" size="sm"
                  class="mx-2 mb-2 shadow-bottom border sidebarPagination" :total-rows="applications.count"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ApplicationsSidebar",
  props: {
    hideHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('applications', ['applications'])
  },
  methods: {
    ...mapActions('applications', ['getApplications']),
    changePage(page) {
      this.getApplications({page})
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
