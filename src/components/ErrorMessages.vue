<template>
  <div class="text-capitalize">
    <div v-if="'required' in field && !field.required">{{ name }} is required.</div>
    <div v-if="'minLength' in field && !field.minLength">{{ name }} must have at least {{ field.minLength.min }}
      letters.
    </div>
    <div v-if="'email' in field && !field.email">{{ name }} must be a valid email.</div>
  </div>
</template>

<script>
export default {
  name: "ErrorMessages",
  props: ['field', 'name']
}
</script>

<style scoped>

</style>
