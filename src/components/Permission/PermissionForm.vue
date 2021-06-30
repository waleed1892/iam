<template>
  <form action="" @submit.prevent="save">
    <b-form-group label-cols="4" content-cols="8" label="Name">
      <b-input :state="$v.permission.name.$error ? false: null" v-model="$v.permission.name.$model" size="sm"
               placeholder="Name"/>
      <template #invalid-feedback>
        <ErrorMessages name="name" :field="$v.permission.name"/>
      </template>
    </b-form-group>
    <b-form-group label-cols="4" content-cols="8" label="Description">
      <b-textarea rows="5" no-resize :state="$v.permission.description.$error ? false: null"
                  v-model="$v.permission.description.$model"
                  size="sm"
                  placeholder="Description"/>
      <template #invalid-feedback>
        <ErrorMessages name="description" :field="$v.permission.description"/>
      </template>
    </b-form-group>
    <b-form-group label-cols="4" content-cols="8" label="Active">
      <b-check v-model="permission.is_active" switch/>
    </b-form-group>
    <div class="text-right">
      <b-button @click="save" variant="primary" size="sm" class="shadow-bottom mr-3">Add Permission</b-button>
      <b-button @click="$emit('close')" variant="light" class="border" size="sm">Cancel</b-button>
    </div>
  </form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import ErrorMessages from "../ErrorMessages";
import {mapActions} from "vuex";
import {permissionValidation} from "../../validations/permissionValidation";

export default {
  name: "PermissionForm",
  data() {
    return {
      permission: {
        name: '',
        description: '',
        is_active: false
      }
    }
  },
  components: {ErrorMessages},
  mixins: [validationMixin],
  validations: permissionValidation,
  methods: {
    ...mapActions('applications', ['savePermission']),
    async save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const permission = {
        ...this.permission,
        app_id: this.$route.params.application_id
      }
      await this.savePermission(permission)
      const makeToast = await import('../../helpers/toastMessages').then(mod => mod.makeToast.bind(this))
      makeToast('Permission Added', 'success')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
