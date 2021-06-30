<template>
  <div>
    <Header/>
    <PageHeader>
      <template #left>
        <b-icon-people-fill class="mr-3"/>
        Users
      </template>
    </PageHeader>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";

export default {
  name: "Users",
  components: {PageHeader, Header}
}
</script>

<style scoped lang="scss">
</style>
