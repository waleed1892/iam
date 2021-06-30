<template>
  <div class="flex-grow-1 d-flex flex-column">
    <ul id="permissions" class="list-unstyled py-3 px-3 flex-grow-1 sidebarList">
      <li class="mb-2" v-for="permission in permissions.results"
          :key="permission.id">
        <router-link
            to=""
            class="d-block rounded px-3 py-2 text-decoration-none font-semibold">
          {{ permission.name }}
        </router-link>
      </li>
    </ul>
    <b-pagination @change="changePage" :value="permissions.current_page" size="sm"
                  class="mx-2 mb-2 shadow-bottom border sidebarPagination" :total-rows="permissions.count"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ApplicationPermissionsSideList",
  created() {
    this.getPermissions({id: this.$route.params.application_id})
  },
  computed: {
    ...mapState('applications', ['permissions'])
  },
  methods: {
    ...mapActions('applications', ['getPermissions']),
    changePage(page) {
      this.getPermissions({id: this.$route.params.application_id, page})
    }
  }
}
</script>

<style scoped>

</style>
