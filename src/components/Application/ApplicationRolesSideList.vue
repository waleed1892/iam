<template>
  <div class="flex-grow-1 d-flex flex-column">
    <ul id="roles" class="list-unstyled py-3 px-3 flex-grow-1 sidebarList">
      <li class="mb-2" v-for="role in roles.results"
          :key="role.id">
        <router-link
            to=""
            class="d-block rounded px-3 py-2 text-decoration-none font-semibold">
          {{ role.name }}
        </router-link>
      </li>
    </ul>
    <b-pagination @change="changePage" :value="roles.current_page" size="sm"
                  class="mx-2 mb-2 shadow-bottom border sidebarPagination" :total-rows="roles.count"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ApplicationRolesSideList",
  created() {
    this.getRoles({id: this.$route.params.application_id})
  },
  computed: {
    ...mapState('applications', ['roles'])
  },
  methods: {
    ...mapActions('applications', ['getRoles']),
    changePage(page) {
      this.getRoles({id: this.$route.params.application_id, page})
    }
  }
}
</script>

<style scoped>

</style>
