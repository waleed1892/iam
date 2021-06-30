<template>
  <div>
    <Header/>
    <PageHeader>
      <template #left>
        <img src="/images/applications.svg" class="mr-3" alt="">
        Applications
      </template>
      <template #right>
        <b-button size="sm" class="border shadow-bottom bg-white text-dark">
          <b-icon-search/>
          Filter
        </b-button>
<!--        <b-button size="sm" variant="primary" class="shadow-bottom ml-3">Create New App</b-button>-->
      </template>
    </PageHeader>
    <b-container class="mt-4">
      <AllApplications/>
    </b-container>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import AllApplications from "../components/Applications/AllApplications";

export default {
  name: "Applications",
  components: {AllApplications, PageHeader, Header}
}
</script>

<style scoped>

</style>
