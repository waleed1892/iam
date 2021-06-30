<template>
  <form>
    <!--    <b-form-group label="User Type" label-cols="6" content-cols="6">-->
    <!--      <b-select size="sm" :options="userTypes"></b-select>-->
    <!--    </b-form-group>-->
    <b-form-group label="First Name" label-cols="6" content-cols="6">
      <b-input :state="$v.user.first_name.$error ? false: null" v-model="$v.user.first_name.$model" size="sm"/>
      <template #invalid-feedback>
        <ErrorMessages name="First Name" :field="$v.user.first_name"/>
      </template>
    </b-form-group>
    <b-form-group label="Last name" label-cols="6" content-cols="6">
      <b-input :state="$v.user.last_name.$error ? false: null" v-model="$v.user.last_name.$model" size="sm"/>
      <template #invalid-feedback>
        <ErrorMessages name="Last Name" :field="$v.user.last_name"/>
      </template>
    </b-form-group>
    <b-form-group label="Username" label-cols="6" content-cols="6">
      <b-input :state="$v.user.username.$error ? false: null" v-model="$v.user.username.$model" size="sm"/>
      <template #invalid-feedback>
        <ErrorMessages name="Username" :field="$v.user.username"/>
      </template>
    </b-form-group>
    <b-form-group label="Primary Email " label-cols="6" content-cols="6">
      <b-input :state="$v.user.email.$error ? false: null" v-model="$v.user.email.$model" size="sm"/>
      <template #invalid-feedback>
        <ErrorMessages name="Email" :field="$v.user.email"/>
      </template>
    </b-form-group>
    <b-form-group label-cols="6" content-cols="6">
      <template #label>Secondary email <span class="text-black-50">(optional)</span></template>
      <b-input v-model="user.secondary_email" size="sm"/>
    </b-form-group>
    <b-form-group label-cols="6" content-cols="6">
      <template #label>Groups <span class="text-black-50">(optional)</span></template>
      <b-select v-model="user.groups" :options="[]" size="sm"/>
    </b-form-group>
    <b-form-group label="Password" label-cols="6" content-cols="6">
      <b-select v-model="user.password" size="sm" :options="[]"></b-select>
    </b-form-group>
    <div class="text-right mt-5">
      <b-button @click="save" variant="primary" size="sm" class="mr-3">Save</b-button>
      <b-button @click="save($event,true)" variant="primary" size="sm" class="mr-3">Save and Add Another</b-button>
      <b-button @click="$emit('close')" variant="light" class="border" size="sm">Cancel</b-button>
    </div>
  </form>
</template>

<script>
import {mapActions} from "vuex";
import {user} from "../../constants";
import {validationMixin} from 'vuelidate'
import userValidation from "../../validations/userValidation";
import ErrorMessages from "../ErrorMessages";

export default {
  name: "PersonForm",
  components: {ErrorMessages},
  mixins: [validationMixin],
  data() {
    return {
      user: {...user}
    }
  },
  validations: userValidation,
  methods: {
    async save(e, reset = false) {
      e.preventDefault()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      await this.saveUser(this.user)
      const makeToast = await import('../../helpers/toastMessages').then(mod => mod.makeToast.bind(this))
      makeToast('Permissions assigned', 'success')
      if (reset) {
        this.$v.$reset();
        this.user = {...user}
      } else {
        this.$emit('saved')
      }
    },
    ...mapActions('users', ['saveUser']),
  },
  computed: {
    userTypes: function () {
      return ['User', 'Admin']
    }
  }
}
</script>

<style scoped>

</style>
