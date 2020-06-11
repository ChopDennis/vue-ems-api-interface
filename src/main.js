import Vue from 'vue'
import app from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import 'default-passive-events'
import "jquery"
import "bootstrap/dist/js/bootstrap.js"
import {store} from "./store/"

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

router.beforeEach((to, from, next )=>{
    if( getCookie('login')==='true'){
        next();
    } else {
        if( to.path !== '/')
            next('/');
        else
            next();
    }
})

new Vue({
    store:store,
    router,
    render: h => h(app)
}).$mount('#app')

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
