<template>
  <form action="" @submit.prevent="save">
    <b-form-group label-cols="4" content-cols="8" label="Name">
      <b-input :state="$v.role.name.$error ? false: null" v-model="$v.role.name.$model" size="sm"
               placeholder="Name"/>
      <template #invalid-feedback>
        <ErrorMessages name="name" :field="$v.role.name"/>
      </template>
    </b-form-group>
    <b-form-group label-cols="4" content-cols="8" label="Description">
      <b-textarea rows="5" no-resize :state="$v.role.description.$error ? false: null"
                  v-model="$v.role.description.$model"
                  size="sm"
                  placeholder="Description"/>
      <template #invalid-feedback>
        <ErrorMessages name="description" :field="$v.role.description"/>
      </template>
    </b-form-group>
    <b-form-group label-cols="4" content-cols="8" label="Active">
      <b-check v-model="role.is_active" switch/>
    </b-form-group>
    <div class="text-right">
      <b-button @click="save" variant="primary" size="sm" class="shadow-bottom mr-3">Add Role</b-button>
      <b-button @click="$emit('close')" variant="light" class="border" size="sm">Cancel</b-button>
    </div>
  </form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import ErrorMessages from "../ErrorMessages";
import {roleValidation} from "../../validations/roleValidations";
import {mapActions} from "vuex";

export default {
  name: "RoleForm",
  data() {
    return {
      role: {
        name: '',
        description: '',
        is_active: false
      }
    }
  },
  components: {ErrorMessages},
  mixins: [validationMixin],
  validations: roleValidation,
  methods: {
    ...mapActions('applications', ['saveRole']),
    async save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const role = {
        ...this.role,
        app_id: this.$route.params.application_id,
      }
      await this.saveRole(role)
      const makeToast = await import('../../helpers/toastMessages').then(mod => mod.makeToast.bind(this))
      makeToast('Role Added', 'success')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
