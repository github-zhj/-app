import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component: () => import('../views/Recommend.vue'),
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    }, {
      path: '/daily',
      name: 'Daily',
      component: () => import('../views/Daily.vue'),
    },
    {
      path: '/find',
      name: 'Find',
      component: () => import('../views/Find.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('../views/Mine.vue')
    },]
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('../views/Play.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
