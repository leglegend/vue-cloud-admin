import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
import Home from '../pages/home/index.vue'
import MemberList from '../pages/member/list/index.vue'
import Layout from '../layout/index.vue'
import MemberDetail from '../pages/member/detail/index.vue'
import Detail from '../pages/order/detail/index.vue'
import Card from '../pages/member/card/index.vue'

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
    meta: { title: '列表', icon: 'Grid' },
    children: [
      {
        path: 'list',
        name: 'MemberList',
        component: MemberList,
        meta: { title: '分页列表', icon: 'Tickets' }
      },
      {
        path: 'card',
        name: 'Card',
        component: Card,
        meta: { title: '应用列表', icon: 'CreditCard' }
      }
    ]
  },
  {
    path: '/list',
    component: Layout,
    meta: { title: '表单', icon: 'ElemeFilled' },
    children: [
      {
        path: 'detail',
        name: 'TradeDetail',
        component: Detail,
        meta: { title: '详情页', icon: 'ScaleToOriginal' }
      },
      {
        path: 'persion',
        name: 'MemberDetail',
        component: MemberDetail,
        meta: { title: '个人资料', icon: 'User' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.fullPath === '/login') next()
  else if (from.fullPath !== '/login') router.push('/login')
})

export default router
