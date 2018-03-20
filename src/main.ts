import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// global custom directives
import { VTooltip } from 'v-tooltip'
Vue.directive('tooltip', VTooltip)

// global components
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import Buefy from 'buefy'
Vue.component('b-tab-item', Buefy.TabItem)
Vue.component('b-tabs', Buefy.Tabs)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app')
