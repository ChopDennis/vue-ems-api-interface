import Vue from 'vue'
import app from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import 'default-passive-events'
import "jquery"
import "bootstrap/dist/js/bootstrap.js"

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(app)
}).$mount('#app')

