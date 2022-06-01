import {RouterMount,createRouter} from 'uni-simple-router';
import Home from '../pages/home/index.vue'
import Layout from '../layout/index.vue'
import Login from '../pages/login/index.vue'
import List from '../pages/member/list/index.vue'
import Card from '../pages/member/card/index.vue'
import Detail from '../pages/order/detail/index.vue'
import MemberDetail from '../pages/member/detail/index.vue'

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
        meta: { title: '首页', icon: 'el-icon-s-home' },
        props: ({ params }) => params
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
        component: List,
        meta: { title: '分页列表', icon: 'el-icon-tickets' },
        props: ({ params }) => params
      },
      {
        path: 'card',
        name: 'Card',
        component: Card,
        meta: { title: '应用列表', icon: 'el-icon-bank-card' },
        props: ({ params }) => params
      }
    ]
  },
  {
    path: '/list',
    component: Layout,
    meta: { title: '表单', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'detail',
        name: 'TradeDetail',
        component: Detail,
        meta: { title: '详情页', icon: 'el-icon-c-scale-to-original' },
        props: ({ params }) => params
      },
      {
        path: 'persion',
        name: 'MemberDetail',
        component: MemberDetail,
        meta: { title: '个人资料', icon: 'el-icon-user' },
        props: ({ params }) => params
      }
    ]
  }
]
const router = createRouter({
	platform: 'h5',  
	h5: {
		vueRouterDev:true,
	},
	routes: routes
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (localStorage.getItem('token') || to.fullPath === '/login') next()
  else if (from.fullPath !== '/login')router.push('/login')
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
	router,
	RouterMount,
	routes
}