import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:player',
    name: 'Player',
    component:() => import("../views/Player.vue"),
  },
  {
    path: '/:player/matches',
    name: 'Matches',
    component:() => import("../views/Matches.vue"),
  },
  {
    path: '/:player1/vs/:player2',
    name: 'Versus',
    component:() => import("../views/Versus.vue"),
  },
  
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})



export default router
