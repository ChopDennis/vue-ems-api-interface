import Vue from 'vue'
import VueRouter from 'vue-router'
// import Heatmap from '../components/heatmap.vue'
// import Area from '../components/area.vue'
// import Header from '../components/header.vue'
// import RealTime from '../components/real-time.vue'
// import HeatmapMonth from '../components/heatmap-month.vue'
import PageLogin from "../views/PageLogin";
import PageRealTime from "../views/PageRealTime";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'PageLogin',
        components: {
            default: PageLogin,
        }
    },{
        path: '/real-time',
        name: 'PageRealTime',
        components: {
            default: PageRealTime,
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
