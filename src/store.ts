import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    setServerVersion({ commit }, version) {
      commit('SET_SERVER_VERSION', version)
    },
  },
  mutations: {
    ['SET_SERVER_VERSION'](state, version) {
      state.serverVersion = version
    },
  },
  state: {
    serverVersion: 'dev',
  },
  strict: process.env.NODE_ENV !== 'production',
})
