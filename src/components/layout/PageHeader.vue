<template>
  <b-container id="pageHeader">
    <div class="d-flex justify-content-between">
      <h1 class="heading">
        <slot name="left"></slot>
      </h1>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "PageHeader"
}
</script>

<style scoped>

</style>
