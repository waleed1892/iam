<template>
  <div>
    <p>Add groups to quickly perform actions across large set of people.</p>
    <form action="">
      <b-form-group label-cols="4" content-cols="8" label="Name">
        <b-input :state="$v.name.$error ? false: null" v-model="$v.name.$model" size="sm"
                 placeholder="Enter a name for this group"/>
        <template #invalid-feedback>
          <ErrorMessages name="name" :field="$v.name"/>
        </template>
      </b-form-group>
      <b-form-group label-cols="4" content-cols="8" label="Description">
        <b-textarea rows="5" no-resize :state="$v.description.$error ? false: null" v-model="$v.description.$model"
                    size="sm"
                    placeholder="Enter a description for this group"/>
        <template #invalid-feedback>
          <ErrorMessages name="description" :field="$v.name"/>
        </template>
      </b-form-group>
      <div class="text-right">
        <b-button @click="save" variant="primary" size="sm" class="shadow-bottom mr-3">Add Group</b-button>
        <b-button @click="$emit('close')" type="button" size="sm" variant="none"
                  class="bg-white shadow-bottom border text-dark">Cancel
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {groupValidation} from "../../validations/groupValidations";
import ErrorMessages from "../ErrorMessages";
import {mapActions} from "vuex";


export default {
  name: "GroupForm",
  data() {
    return {
      name: '',
      description: ''
    }
  },
  components: {ErrorMessages},
  mixins: [validationMixin],
  validations: groupValidation,
  methods: {
    ...mapActions('groups', ['saveGroup']),
    async save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }
      const data = {
        name: this.name,
        description: this.description
      }
      await this.saveGroup(data);
      const makeToast = await import('../../helpers/toastMessages').then(mod => mod.makeToast.bind(this))
      makeToast('Group Added', 'success')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
