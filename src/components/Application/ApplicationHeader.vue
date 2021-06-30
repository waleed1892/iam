<template>
  <b-container class="position-relative pt-2">
    <a href="" id="close">
      <b-icon-x-circle-fill font-scale="1.5" variant="danger"/>
    </a>
    <b-row id="applicationHeader" align-v="center" class="py-2">
      <b-col md="2">
        <div class="text-center w-100" style="height: 60px">
          <img class="w-100 h-100 object-contain" :src="application.logo" alt="">
        </div>
      </b-col>
      <b-col md="2">
        <h1>{{ application.name }}</h1>
      </b-col>
      <b-col v-if="!hideDescription" md="8">
        <p id="description" class="mb-0">{{ application.description }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ApplicationHeader",
  props: {
    hideDescription: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('applications', ['application'])
  }
}
</script>

<style scoped lang="scss">
#close {
  position: absolute;
  top: -10px;
  right: -10px;
}

#applicationHeader {
  background: rgba(255, 255, 255, 0.4);

  h1 {
    font-size: 20px;
  }

  #description {
    font-size: 14px;
    font-weight: 400;
  }

}
</style>
