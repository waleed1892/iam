<template>
  <div>
    <Header/>
    <PageHeader>
      <template #left>
        <b-icon-person-fill class="mr-3"/>
        People
      </template>
      <template #right>
        <b-button v-b-modal.addPerson size="sm" class="border shadow-bottom bg-white text-dark mr-3">
          <b-icon-person-plus-fill/>
          Add Person
        </b-button>
        <b-button v-b-modal.filter size="sm" class="border shadow-bottom bg-white text-dark">
          <b-icon-search/>
          Filter
        </b-button>
      </template>
    </PageHeader>
    <b-container class="my-5">
      <div v-if="!Object.keys(search).length" class="bg-white py-4 border shadow-sm"></div>
      <search-criteria-bar @updateSearch="updateSearch" v-else :search="search"/>
      <b-row no-gutters>
        <b-col md="3">
          <Sidebar/>
        </b-col>
        <b-col md="9">
          <PeopleListing/>
        </b-col>
      </b-row>
    </b-container>
    <b-modal lazy size="lg" centered content-class="shadow-bottom" hide-header-close hide-footer
             id="addPerson"
             title="Add Person">
      <template #modal-title>
        Add Person
      </template>
      <template #default="{close}">
        <PersonForm @close="close" @saved="close"></PersonForm>
      </template>
    </b-modal>
    <b-modal lazy size="lg" centered content-class="shadow-bottom" hide-header-close footer-border-variant="top-0"
             id="filter"
             hide-footer
             title="Search Filter">
      <template #default="{close}">
        <FilterForm @updateSearch="updateSearch" :search="search" @close="close"></FilterForm>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Sidebar from "../components/People/Sidebar";
import PeopleListing from "../components/People/PeopleListing";
import {mapState, mapMutations, mapActions} from "vuex";

export default {
  name: "Directory",
  components: {
    SearchCriteriaBar: () => import('../components/searchCriteriaBar'),
    PeopleListing,
    FilterForm: () => import("../components/People/FilterForm"),
    PersonForm: () => import("../components/People/PersonForm"),
    Sidebar,
    PageHeader,
    Header
  },
  computed: {
    ...mapState('users', ['search']),
  },
  methods: {
    ...mapMutations('users', ['setSearch']),
    ...mapActions('users', ['getUsers']),
    updateSearch(search) {
      this.setSearch(search)
      this.getUsers({})
    }
  }
}
</script>

<style scoped lang="scss">
</style>
