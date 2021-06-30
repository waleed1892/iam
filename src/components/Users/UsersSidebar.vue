<template>
  <div class="bg-white d-flex flex-column min-vh-100">
    <h1 class="border-bottom font-semibold py-3 text-center">Users</h1>
    <ul id="users" class="list-unstyled py-3 px-3 flex-grow-1 sidebarList">
      <li class="mb-2" :class="[user.id===Number($route.params.user_id) ? 'active': '']" v-for="user in users.results"
          :key="user.id">
        <router-link :to="{name:'User',params: {user_id: user.id}}"
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
import {mapState, mapActions} from "vuex";

export default {
  name: "UsersSidebar",
  props: {
    hideHeader: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    changePage(page) {
      this.getUsers({page})
    }
  },
  computed: {
    ...mapState('users', ['users']),
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/app.scss";

h1 {
  font-size: 18px;
}

</style>
