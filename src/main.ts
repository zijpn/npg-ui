import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// global custom directives
import { VTooltip } from 'v-tooltip'
Vue.directive('tooltip', VTooltip)

// global components
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
import VueSplit from 'vue-splitjs'
Vue.component('vue-split', VueSplit)

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
