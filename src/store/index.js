import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        axios:{
            baseURL: "https://demo-site.ima-ems.com"
        }
    }
})