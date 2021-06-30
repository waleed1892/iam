<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-people-fill/>
            Group Name
          </template>
          <b-input v-model="filter.name" size="sm"/>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-people-fill/>
            People
          </template>
          <b-select v-model="filter.people" :options="peopleOptions" size="sm"/>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-grid3x3-gap-fill/>
            Apps
          </template>
          <b-select v-model="filter.apps" :options="appOptions" size="sm"/>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-list-ul/>
            Directories
          </template>
          <b-select v-model="filter.directories" :options="directoryOptions" size="sm"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-alert variant="danger" :show="error">
      Select at least one filter
    </b-alert>
    <div class="text-right">
      <b-button @click="$emit('close')" type="button" size="sm" variant="danger"
                class="shadow-bottom mr-3">
        <b-icon-x-circle-fill/>
        Cancel
      </b-button>
      <b-button @click="applyFilter" variant="primary" size="sm" class="shadow-bottom">
        <b-icon-check-circle-fill/>
        Apply Filter
      </b-button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "GroupFilterForm",
  data() {
    return {
      error: false,
      filter: {
        name: '',
        people: '',
        apps: '',
        directories: ''
      }
    }
  },
  props: ['search'],
  created() {
    const filter = {...this.filter, ...this.search}
    this.filter = filter
  },
  methods: {
    ...mapMutations('groups', ['setSearch']),
    applyFilter() {
      const filters = {...this.filter}
      const filled = {};
      for (const filtersKey in filters) {
        if (filters[filtersKey]) {
          filled[filtersKey] = filters[filtersKey]
        }
      }
      if (!Object.values(filled).length) {
        this.error = true
        return false;
      }
      this.$emit('updateSearch', filled)
      this.$emit('close')
    }
  },
  computed: {
    peopleOptions() {
      return ['p1', 'p2', 'p3']
    },
    appOptions() {
      return ['app1', 'app2', 'app3']
    },
    directoryOptions() {
      return ['dir1', 'dir2', 'dir3']
    }
  }
}
</script>

<style scoped>

</style>
