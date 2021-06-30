<template>
  <div class="d-flex text-black-50 justify-content-between">
    <div id="left" class="d-flex align-items-center">
      <div class="mr-3">Rows per page:</div>
      <b-select @change="changePageSize" v-model="params.page_size" style="width: 70px" :options="options"
                size="sm"></b-select>
    </div>
    <div class="d-flex align-items-center">
      <div class="mr-3">{{ from }}-{{ to }} of {{ total }} items</div>
      <b-icon-chevron-left @click="previousPage" class="mr-3 cursor-pointer"/>
      <b-icon-chevron-right @click="nextPage" class="cursor-pointer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      params: {
        page_size: 20,
        page: 1
      }
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    call: {
      type: Function,
    },
    next: {
      type: String
    },
    previous: {
      type: String
    }
  },
  methods: {
    changePageSize() {
      let page = Math.ceil(this.total / this.params.page_size);
      const params = {...this.params};
      if (params.page === 1 && page > 1)
        page -= 1
      params.page = page
      this.params = {...params}

      this.call(this.params);
    },
    nextPage() {
      if (!this.next) {
        return
      }
      const params = {...this.params}
      params.page += 1;
      this.params = {...params}
      this.call(this.params)
    },
    previousPage() {
      if (!this.previous) {
        return
      }
      const params = {...this.params}
      params.page -= 1;
      this.params = {...params}
      this.call(this.params)
    }
  },
  computed: {
    options() {
      return [20, 50, 70, 100]
    },
    from() {
      const {page, page_size} = this.params;
      if (this.total === 0) {
        return 0;
      }
      return this.params.page === 1 ? 1 : (page - 1) * page_size;
    },
    to() {
      const {page, page_size} = this.params;
      const to = page * page_size
      return this.total <= to ? this.total : to;
    }
  }
}
</script>

<style scoped lang="scss">
</style>
