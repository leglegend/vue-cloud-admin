import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
import Home from '../pages/home/index.vue'
import Layout from '../layout/index.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
