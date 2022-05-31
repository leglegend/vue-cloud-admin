import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
import Home from '../pages/home/index.vue'
import MemberList from '../pages/member/list/index.vue'
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
    meta: { title: '首页', icon: 'HomeFilled' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    meta: { title: '列表', icon: 'el-icon-s-grid' },
    children: [
      {
        path: 'list',
        name: 'MemberList',
        component: MemberList,
        meta: { title: '分页列表', icon: 'el-icon-tickets' }
      }
    ]
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
