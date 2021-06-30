<template>
  <form action="">
    <b-row>
      <!--      <b-col md="6">-->
      <!--        <b-form-group>-->
      <!--          <template #label>-->
      <!--            <b-icon-calendar2-week class="mr-3"/>-->
      <!--            Date From-->
      <!--          </template>-->
      <!--          <b-form-datepicker size="sm" label-no-date-selected="">-->
      <!--            <template #button-content></template>-->
      <!--          </b-form-datepicker>-->
      <!--        </b-form-group>-->
      <!--      </b-col>-->
      <!--      <b-col md="6">-->
      <!--        <b-form-group>-->
      <!--          <template #label>-->
      <!--            <b-icon-calendar2-week class="mr-3"/>-->
      <!--            Date To-->
      <!--          </template>-->
      <!--          <b-form-datepicker size="sm" label-no-date-selected="">-->
      <!--            <template #button-content></template>-->
      <!--          </b-form-datepicker>-->
      <!--        </b-form-group>-->
      <!--      </b-col>-->
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-list-ul class="mr-3"/>
            Departments
          </template>
          <b-select :options="departments" v-model="filter.department" size="sm"></b-select>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-journal-bookmark-fill class="mr-3"/>
            Status
          </template>
          <b-select :options="statuses" v-model="filter.status" size="sm"></b-select>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-people-fill class="mr-3"/>
            Name
          </template>
          <b-input v-model="filter.name" size="sm" placeholder="Search By Name"/>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <img src="/images/nationality.svg" class="mr-3" alt="">
            Nationality
          </template>
          <b-select :options="nationality" v-model="filter.nationality" size="sm"></b-select>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <img src="/images/iqama.svg" class="mr-3" alt="">
            Iqama
          </template>
          <b-select :options="iqama" v-model="filter.iqama" size="sm"></b-select>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <template #label>
            <b-icon-geo-alt-fill class="mr-3"/>
            City
          </template>
          <b-select :options="cities" v-model="filter.city" size="sm"></b-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-alert :show="error" variant="danger">
      Select at least one filter
    </b-alert>
    <div class="text-right">
      <b-button class="mr-3" @click="$emit('close')" variant="danger" size="sm">
        <b-icon-x-circle-fill class="mr-1"/>
        Cancel
      </b-button>
      <b-button @click="applyFilter" variant="primary" size="sm">
        <b-icon-check-circle-fill/>
        Apply Filter
      </b-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FilterForm",
  data() {
    return {
      filter: {
        department: '',
        status: '',
        name: '',
        nationality: '',
        iqama: '',
        city: ''
      },
      error: false
    }
  },
  props: ['search'],
  created() {
    let filter = {...this.filter}
    filter = {...filter, ...this.search}
    this.filter = {...filter}
  },
  computed: {
    departments() {
      return ['dep1', 'dep2', 'dep3']
    },
    statuses() {
      return ['status1', 'status2', 'status3']
    },
    nationality() {
      return ['Saudi', 'Pakistani']
    },
    iqama() {
      return ['Iqama1', 'Iqama2']
    },
    cities() {
      return ['Mecca', 'Medina', 'Jeddah', 'Riyadh']
    }
  },
  methods: {
    applyFilter() {
      const filter = {...this.filter}
      const filled = {}
      for (const field in filter) {
        if (filter[field]) {
          filled[field] = filter[field]
        }
      }
      if (!Object.values(filled).length) {
        this.error = true
        return false;
      }
      this.$emit('updateSearch', filled)
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>
