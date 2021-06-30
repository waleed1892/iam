<template>
  <b-modal lazy :id="id" centered hide-footer hide-header no-close-on-backdrop>
    <template #default="{cancel,hide}">
      <div class="title text-center">
        <slot name="default"></slot>
      </div>
      <div class="text-center mt-3">
        <b-button @click="() => accept(hide)" size="sm" variant="danger">Yes</b-button>
        <b-button @click="cancel" size="sm" variant="primary" class="ml-2">Cancel</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "confirmAlert",
  props: ['id'],
  methods: {
    accept(hide) {
      this.$emit('accept')
      hide()
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 25px;
}
</style>
