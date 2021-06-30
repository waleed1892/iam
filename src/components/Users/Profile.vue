<template>
  <div class="p-3">
    <b-row>
      <b-col md="6">Name</b-col>
      <b-col md="6">{{ `${user.first_name} ${user.last_name}` }}</b-col>
      <b-col md="6">Username</b-col>
      <b-col md="6">{{ user.username }}</b-col>
      <b-col md="6">Email</b-col>
      <b-col md="6">{{ user.email }}</b-col>
      <b-col md="6">Created On</b-col>
      <b-col md="6">{{ user.created_at }}</b-col>
      <b-col md="6">Nationality</b-col>
      <b-col md="6">{{ user.nationality }}</b-col>
      <b-col md="6">City</b-col>
      <b-col md="6">{{ user.city }}</b-col>
      <b-col md="6">Iqama</b-col>
      <b-col md="6">{{ user.iqama }}</b-col>
      <b-col md="6">Department</b-col>
      <b-col md="6">{{ user.department }}</b-col>
      <b-col md="6"></b-col>
      <b-col md="6">{{ user.department }}</b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Profile",
  created() {
    this.getUser(this.$route.params.user_id)
  },
  methods: {
    ...mapActions('users', ['getUser'])
  },
  computed: {
    ...mapState('users', ['user'])
  }
}
</script>

<style scoped>

</style>
