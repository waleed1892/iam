<template>
  <div>
    <div class="pb-2 px-4 mb-4">
      <b-input @input="searchApplication" v-model="search" class="w-25 ml-auto" size="sm"/>
    </div>
    <div>
      <div class="border-top py-4">
        <b-row no-gutters align-v="center">
          <b-col md="2">
            <div class="text-center">
              <img src="/images/microsoft.svg" alt="">
            </div>
          </b-col>
          <b-col md="2">
            <div class="text-center">
              Microsoft
            </div>
          </b-col>
          <b-col md="8">
            <div class="text-right px-4">
              <b-button size="sm" variant="none" class="border shadow-bottom text-dark bg-white">Assign</b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="border-top py-4">
        <b-row no-gutters align-v="center">
          <b-col md="2">
            <div class="text-center">
              <img src="/images/microsoft.svg" alt="">
            </div>
          </b-col>
          <b-col md="2">
            <div class="text-center">
              Microsoft
            </div>
          </b-col>
          <b-col md="8">
            <div class="text-right px-4">
              <b-button size="sm" variant="none" class="border shadow-bottom text-dark bg-white">Assign</b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="text-right mt-5 px-4">
        <b-button variant="primary" size="sm" class="shadow-bottom">Done</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: "GroupAppManagement",
  data() {
    return {
      search: ''
    }
  },
  methods: {
    searchApplication: debounce(function () {
      console.log('searching application')
    }, 500)
  }
}
</script>

<style scoped>

</style>
