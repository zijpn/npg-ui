import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const DEFAULT_PANEL_HEIGHT = 30

export default new Vuex.Store({
  actions: {
    setPanelHeight( { commit }, height) {
      commit('SET_PANEL_HEIGHT', height)
    },
    setPanelTab({ commit }, index) {
      commit('SET_PANEL_TAB', index)
    },
    setServerVersion({ commit }, version) {
      commit('SET_SERVER_VERSION', version)
    },
    setTerminal({ commit }, param) {
      commit('SET_TERMINAL', param)
    },
    togglePanel({ commit }, index) {
      commit('TOGGLE_PANEL', index)
    },
  },
  getters: {
    logPanelActive: (state) => {
      return state.panelVisible && state.panelTab === 2
    },
    panelVisible: (state) => {
      return state.panelVisible
    },
    projectPanelActive: (state) => {
      return state.panelVisible && state.panelTab === 0
    },
    terminalPanelActive: (state) => {
      return state.panelVisible && state.panelTab === 1
    },
  },
  mutations: {
    ['SET_PANEL_HEIGHT'](state, height) {
      state.panelHeightSaved = state.panelHeight
      state.panelHeight = height
      state.panelVisible = (Math.round(state.panelHeight) !== 0)
    },
    ['SET_PANEL_TAB'](state, index) {
      state.panelTab = index
    },
    ['SET_SERVER_VERSION'](state, version) {
      state.serverVersion = version
    },
    ['SET_TERMINAL'](state, param) {
      state.terminalBackend = param.backend
      state.terminalContainer = param.container
    },
    ['TOGGLE_PANEL'](state, index) {
      if (state.panelTab !== index) {
        state.panelTab = index
        state.panelVisible = true
      } else {
        state.panelVisible = !state.panelVisible
      }
      if (state.panelVisible && Math.round(state.panelHeight) === 0) {
        state.panelHeight = state.panelHeightSaved
      }
    },
  },
  state: {
    // height of panel in percent
    panelHeight: DEFAULT_PANEL_HEIGHT,
    panelHeightSaved: DEFAULT_PANEL_HEIGHT,
    // current panel (0=project, 1=terminal, 2=log)
    panelTab: 0,
    // panel visibility
    panelVisible: false,
    // version of the NPG server
    serverVersion: 'dev',
    // terminal request
    terminalBackend: '',
    terminalContainer: '',
  },
  strict: process.env.NODE_ENV !== 'production',
})
