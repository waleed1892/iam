<template>
  <div>
    <Header/>
    <PageHeader>
      <template #left>
        <b-icon-gear-wide-connected class="mr-3"/>
        Integrations
      </template>
    </PageHeader>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";

export default {
  name: "Integrations",
  components: {PageHeader, Header}
}
</script>

<style scoped>

</style>
