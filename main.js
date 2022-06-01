import Vue from 'vue'
import App from './App'
import store from './store'
import ElementUI from 'element-ui'
import {router,RouterMount} from './router'
import 'element-ui/lib/theme-chalk/index.css'

require('./mock')
Vue.use(router)
Vue.use(ElementUI)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
RouterMount(app,router,'#app')
