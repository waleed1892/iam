<template>
  <div>
    <Header/>
    <PageHeader>
      <template #left>
        <b-icon-window class="mr-3"/>
        Dashboard
      </template>
    </PageHeader>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";

export default {
  name: "Dashboard",
  components: {PageHeader, Header}
}
</script>

<style scoped>

</style>
