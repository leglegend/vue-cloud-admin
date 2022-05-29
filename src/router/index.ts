import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [{ path: '/', component: HelloWorld }]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
