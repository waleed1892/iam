<template>
  <div class="d-flex flex-column flex-grow-1">
    <ul id="users" class="list-unstyled py-3 px-3 flex-grow-1 sidebarList">
      <li class="mb-2" :class="[user.id===$route.params.user_id ? 'active': '']" v-for="user in users.results"
          :key="user.id">
        <router-link
            :to="{name:'ApplicationUser',params: {user_id: user.id,application_id:$route.params.application_id}}"
            class="d-block rounded px-3 py-2 text-decoration-none font-semibold"
        >{{ user.username }}
        </router-link>
      </li>
    </ul>
    <b-pagination @change="changePage" :value="users.current_page" size="sm"
                  class="mx-2 mb-2 shadow-bottom border sidebarPagination" :total-rows="users.count"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ApplicationUsersSideList",
  computed: {
    ...mapState('applications', ['users', 'application']),
  },
  methods: {
    ...mapActions('applications', ['getApplicationUsers']),
    changePage(page) {
      this.getApplicationUsers({id: this.application.id, page})
    }
  }
}
</script>

<style scoped>

</style>
