<template>
  <div>
    <Header/>
    <PageHeader>
      <template #left>
        <b-icon-gear-fill class="mr-3"/>
        Settings
      </template>
    </PageHeader>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";

export default {
  name: "Settings",
  components: {PageHeader, Header}
}
</script>

<style scoped>

</style>
