import Vue from 'vue'
import VueRouter from 'vue-router'
import Heatmap from '../components/heatmap.vue'
import Area from '../components/area.vue'
import Header from '../components/header.vue'
import RealTime from '../components/real-time.vue'
import HeatmapMonth from '../components/heatmap-month.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../components/login.vue')
    },
    {
        path: '/heatmap',
        components: {
            default: Heatmap,
            nav: Header
        }
    },
    {
        path: '/area',
        components: {
            default: Area,
            nav: Header
        }
    },
    {
        path: '/heatmap-month',
        components: {
            default: HeatmapMonth,
            nav: Header
        }
    },
    {
        path: '/real-time',
        components: {
            default: RealTime,
            nav: Header
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
