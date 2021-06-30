<template>
  <div>
    <Header/>
    <PageHeader>
      <template #left>
        <b-icon-people-fill class="mr-3"/>
        Groups
      </template>
      <template #right>
        <b-button v-b-modal.addGroup variant="none" class="border shadow-bottom bg-white text-dark mr-3" size="sm">
          <img src="/images/add-group.svg" alt="">
          Add Group
        </b-button>
        <b-button v-b-modal.searchGroup size="sm" variant="none" class="border shadow-bottom bg-white text-dark">
          <b-icon-search/>
          Filter
        </b-button>
      </template>
    </PageHeader>
    <b-modal lazy size="lg" hide-footer hide-header-close centered title="Add Group" id="addGroup">
      <template #default="{close}">
        <GroupForm @close="close"></GroupForm>
      </template>
    </b-modal>
    <b-modal lazy size="lg" hide-header-close hide-footer centered title="Search Group" id="searchGroup">
      <template #default="{cancel,close}">
        <GroupFilterForm @updateSearch="updateSearch" :search="search" @close="close"></GroupFilterForm>
      </template>
    </b-modal>
    <b-container>
      <b-tabs content-class="my-5" nav-wrapper-class="custom-tabs border-bottom">
        <b-tab title="All">
          <b-card no-body class="rounded-0">
            <div v-if="!Object.keys(search).length" class="bg-white py-4 border shadow-sm"></div>
            <search-criteria-bar @updateSearch="updateSearch" v-else :search="search"/>
            <GroupListing class="mb-0"/>
          </b-card>
        </b-tab>
        <b-tab lazy title="Rules">
          <b-card no-body class="rounded-0">
            <GroupRules/>
          </b-card>
        </b-tab>
        <b-tab lazy title="Directories">
          <b-card no-body class="rounded-0">
            <GroupDirectories/>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import GroupListing from "../components/Group/GroupListing";
import SearchCriteriaBar from "../components/searchCriteriaBar";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Groups",
  components: {
    SearchCriteriaBar,
    GroupListing,
    PageHeader,
    Header,
    GroupForm: () => import('../components/Group/GroupForm'),
    GroupFilterForm: () => import('../components/Group/GroupFilterForm'),
    GroupDirectories: () => import("../components/Group/GroupDirectories"),
    GroupRules: () => import("../components/Group/GroupRules"),
  },
  computed: {
    ...mapState('groups', ['search'])
  },
  methods: {
    ...mapMutations('groups', ['setSearch']),
    ...mapActions('groups', ['getGroups']),
    updateSearch(search) {
      this.setSearch(search)
      this.getGroups({search});
    }
  }
}
</script>

<style scoped>

</style>
