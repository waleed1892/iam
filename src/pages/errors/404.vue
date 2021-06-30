<template>
  <div
      class="text-center bg-white d-flex align-items-center justify-content-center flex-column min-vh-100 position-relative">
    <h1 class="display-1 text-uppercase">oops!</h1>
    <p class="text-uppercase position-absolute">404- the page not found</p>
    <b-button to="/" variant="primary" class="shadow-sm text-uppercase">go to homepage</b-button>
  </div>
</template>

<script>
export default {
  name: "404",
}
</script>

<style scoped>
p {
  top: 50%;
  background: white;
}
</style>
