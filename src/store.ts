import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    setEditorHeight( { commit }, height) {
      commit('SET_EDITOR_HEIGHT', height)
    },
    setServerVersion({ commit }, version) {
      commit('SET_SERVER_VERSION', version)
    },
  },
  mutations: {
    ['SET_EDITOR_HEIGHT'](state, height) {
      state.editorHeight = height
    },
    ['SET_SERVER_VERSION'](state, version) {
      state.serverVersion = version
    },
  },
  state: {
    // height of the editor pane in percent
    editorHeight: 100,
    // version of the NPG server
    serverVersion: 'dev',
  },
  strict: process.env.NODE_ENV !== 'production',
})
