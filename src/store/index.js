import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        axios: {
            baseURL: "https://demo-site.ima-ems.com"
        },
        response: {
            real_time: Object
        }
    },
    mutations: {
        setRealTimeData(state, payload) {
            state.response.real_time = payload
        }
    },
    getters: {
        RespondedRealTimeData(state){
            return state.response.real_time
        }
    }
})