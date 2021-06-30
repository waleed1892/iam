<template>
  <div>
    <Header/>
    <b-container>
      <div class="mb-3">
        <router-link :to="{name: 'Groups'}" class="text-black-50">
          <b-icon-arrow-left/>
          Back to Groups
        </router-link>
      </div>
      <PageHeader>
        <template #left>
          <div class="d-flex">
            <b-icon-record-circle-fill class="mr-3 mt-1" variant="primary"/>
            <div>
              <div>{{ group.name }}</div>
              <div class="text-black-50 small mt-2">{{ group.description }}</div>
            </div>
          </div>
        </template>
        <template #right>
          <b-button v-b-modal.manageApplications size="sm" class="bg-white border shadow-bottom text-dark mr-3">
            <b-icon-grid3x3-gap-fill/>
            Manage Apps
          </b-button>
          <b-button size="sm" class="bg-white border shadow-bottom text-dark mr-3">
            <img src="/images/copy.svg" alt=""> Manage Directories
          </b-button>
          <b-button size="sm" class="bg-white border shadow-bottom text-dark">
            <b-icon-search/>
            Filter
          </b-button>
        </template>
      </PageHeader>
      <b-tabs class="my-4" nav-wrapper-class="custom-tabs border-bottom">
        <b-tab title="People">
          <b-card no-body class="mt-4">
            <GroupPeople/>
          </b-card>
        </b-tab>
        <b-tab lazy title="Apps">
          <b-card no-body class="mt-5">
            <GroupApplications/>
          </b-card>
        </b-tab>
        <b-tab title="Directories"></b-tab>
      </b-tabs>
    </b-container>
    <b-modal title="Assign Applications" body-class="px-0" size="lg" lazy id="manageApplications" hide-footer
             hide-header-close>
      <GroupAppManagement/>
    </b-modal>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import GroupPeople from "../components/Group/GroupPeople";
import {mapActions, mapState} from "vuex";

export default {
  name: "Group",
  components: {
    GroupPeople, PageHeader, Header,
    GroupApplications: () => import('../components/Group/GroupApplications'),
    GroupAppManagement: () => import('../components/Group/GroupAppManagement'),
  },
  created() {
    this.getGroup(this.$route.params.id)
  },
  methods: {
    ...mapActions('groups', ['getGroup'])
  },
  computed: {
    ...mapState('groups', ['group'])
  },
  async beforeRouteEnter(to, from, next) {
    if (from.path === '/') {
      const store = (await import('../store/index')).default;
      if (!store.state.groups.groups.length) {
        next({name: 'Groups'})
      }
    } else
      next();
  }
}
</script>

<style scoped>
.small {
  font-size: 14px;
}
</style>
