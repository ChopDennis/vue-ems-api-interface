import Vue from 'vue'
import VueRouter from 'vue-router'
import PageLogin from "../views/PageLogin";
import PageRealTime from "../views/PageRealTime";
import PageHeatmap from "../views/PagePowerConsumption";
import PageFifteenDemand from "../views/PageFifteenDemand";
import PageHourDemand from "../views/PageHourDemand";
import TheHeader from "../components/TheHeader";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'PageLogin',
        components: {
            default: PageLogin,
        }
    },
    {
        path: '/real-time',
        name: 'PageRealTime',
        components: {
            default: PageRealTime,
            nav: TheHeader
        }
    },
    {
        path: '/power-consumption',
        name: 'PageRealTime',
        components: {
            default: PageHeatmap,
            nav: TheHeader
        }
    },
    {
        path: '/fifteen-demand',
        name: 'PageFifteenDemand',
        components: {
            default: PageFifteenDemand,
            nav: TheHeader
        }
    },
    {
        path: '/hour-demand',
        name: 'PageHourDemand',
        components: {
            default: PageHourDemand,
            nav: TheHeader
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
