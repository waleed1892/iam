import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import './assets/styles/scss/app.scss'
import router from "./router/router";
import apiService from "./service/apiService";
import store from "./store";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false
Vue.prototype.$axios = apiService

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
