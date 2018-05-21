import Vue from 'vue'
import App from './App.vue'
import store from './store'

// webpack bundle analysis
//  http://webpack.github.io/analyse/
//  https://chrisbateman.github.io/webpack-visualizer/
//  https://alexkuz.github.io/webpack-chart/

Vue.config.productionTip = false

// global custom directives
import { VTooltip } from 'v-tooltip'
Vue.directive('tooltip', VTooltip)

// global components
Vue.component('font-awesome-icon', () => import(/* webpackChunkName: "fa" */ '@fortawesome/vue-fontawesome')
  .then(({ FontAwesomeIcon }) => FontAwesomeIcon))
import { ResizeObserver } from 'vue-resize'
Vue.component('resize-observer', ResizeObserver)

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app')
