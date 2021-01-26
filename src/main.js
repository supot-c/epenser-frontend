import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import vtouch from 'vue-touch'


import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(vtouch)

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
