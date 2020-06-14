import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        axios: {
            baseURL: "https://demo-site.ima-ems.com"
        },
        response: {
            real_time: Object,
            heatmap: Object
        }
    },
    mutations: {
        setRealTimeData(state, payload) {
            state.response.real_time = payload
        },
        setHeatmapData(state, payload) {
            state.response.heatmap = payload
        }
    },
    getters: {
        RespondedRealTimeData(state) {
            return state.response.real_time
        },
        RespondedHeatmapData(state) {
            return state.response.heatmap
        },
    }
})