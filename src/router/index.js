import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index.vue";
import Layout from "../layout/index.vue";
import Login from "../pages/login/index.vue";
import List from "../pages/member/list/index.vue";
import Card from "../pages/member/card/index.vue";
import Detail from "../pages/order/detail/index.vue";
import MemberDetail from "../pages/member/detail/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: { title: "首页", icon: "el-icon-s-home" },
        props: ({ params }) => params,
      },
    ],
  },
  {
    path: "/member",
    component: Layout,
    meta: { title: "列表", icon: "el-icon-s-grid" },
    children: [
      {
        path: "list",
        name: "MemberList",
        component: List,
        meta: { title: "分页列表", icon: "el-icon-tickets" },
        props: ({ params }) => params,
      },
      {
        path: "card",
        name: "Card",
        component: Card,
        meta: { title: "应用列表", icon: "el-icon-bank-card" },
        props: ({ params }) => params,
      },
    ],
  },
  {
    path: "/list",
    component: Layout,
    meta: { title: "表单", icon: "el-icon-s-order" },
    children: [
      {
        path: "detail",
        name: "TradeDetail",
        component: Detail,
        meta: { title: "详情页", icon: "el-icon-c-scale-to-original" },
        props: ({ params }) => params,
      },
      {
        path: "persion",
        name: "MemberDetail",
        component: MemberDetail,
        meta: { title: "个人资料", icon: "el-icon-user" },
        props: ({ params }) => params,
      },
    ],
  },
];

// [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token") || to.fullPath === "/login") next();
  else if (from.fullPath !== "/login") router.push("/login");
});

export default router;
