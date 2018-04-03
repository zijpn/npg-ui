import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// global custom directives
import { VTooltip } from 'v-tooltip'
Vue.directive('tooltip', VTooltip)

// global components
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
import { ResizeObserver } from 'vue-resize'
Vue.component('resize-observer', ResizeObserver)

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app')
