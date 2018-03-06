import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      component: Home,
      name: 'home',
      path: '/',
    },
    {
      component: About,
      name: 'about',
      path: '/about',
    },
  ],
})
