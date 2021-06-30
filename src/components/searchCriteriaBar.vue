<template>
  <div class="bg-white border py-1 px-4 shadow-sm">
    <div class="text-center font-weight-bold mb-2">Search Criteria</div>
    <ul class="list-unstyled d-flex flex-wrap align-items-center searchFilters">
      <li class="bg-primary rounded-lg text-white px-2 py-1 mb-2" v-for="(field,key) in search" :key="key">
        <span class="text-capitalize">{{ key }}: </span><span>{{ field }}</span>
        <b-icon-x @click="removeFilter(key)" class="align-middle cursor-pointer" font-scale="1.4"/>
      </li>
      <li>
        <a href="" @click.prevent="clearAll" class="text-primary">Clear All Filter</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "searchCriteriaBar",
  props: ['search'],
  methods: {
    clearAll() {
      this.$emit('updateSearch', {})
    },
    removeFilter(key) {
      const search = {...this.search};
      delete search[key];
      this.$emit('updateSearch', search)
    }
  }
}
</script>

<style scoped lang="scss">
.searchFilters {
  li {
    &:not(:first-of-type) {
      margin-left: 10px;
    }
  }
}
</style>
