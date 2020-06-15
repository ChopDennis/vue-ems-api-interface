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
            heatmap: Object,
            demand: Object,
        },
        selected: {
            date: String
        }
    },
    mutations: {
        setRealTimeData(state, payload) {
            state.response.real_time = payload
        },
        setHeatmapData(state, payload) {
            state.response.heatmap = payload
        },
        setDemandData(state, payload) {
            state.response.demand = payload
        },
        setSelectedDate(state, payload) {
            state.selected.date = payload
        },
    },
    getters: {
        RespondedRealTimeData(state) {
            return state.response.real_time
        },
        RespondedHeatmapData(state) {
            return state.response.heatmap
        },
        RespondedDemandData(state) {
            return state.response.demand
        },
        SelectedDate(state){
            return state.selected.date
        }
    }
})