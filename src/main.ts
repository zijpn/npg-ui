import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// global custom directives
import { VTooltip } from 'v-tooltip'
Vue.directive('tooltip', VTooltip)

// global components (lazy loaded)
Vue.component('font-awesome-icon', () => import(/* webpackChunkName: "fa" */ '@fortawesome/vue-fontawesome')
  .then(({ FontAwesomeIcon }) => FontAwesomeIcon))
Vue.component('resize-observer', () => import(/* webpackChunkName: "resize" */ 'vue-resize')
  .then(({ ResizeObserver }) => ResizeObserver))

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app')
