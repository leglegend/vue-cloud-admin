import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'

const store = createStore({
  modules: {
    app,
    user
  },
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state: any) {
      state.count++
    }
  }
})

export default store
