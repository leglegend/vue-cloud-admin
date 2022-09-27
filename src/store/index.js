import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    calcCount (state) {
      return (params) => {
        return state.count + params
      }
    },
    getCount: state => {
      return state.count
    }
  },
  actions: {
    addCount (context, payload) {
      console.log(context)
      console.log(payload)
      context.commit('addCount', payload)
    }
  },
  mutations: {
    addCount (state, payload = 1) {
      state.count += payload
    }
  },
  modules: {
    app,
    user,
    test: {
      namespaced: true,
      state: {
        count: 1
      },
      getters: {
        calcCount (state) {
          return (params) => {
            return state.count + params
          }
        },
        getCount: state => {
          return state.count
        }
      },
      actions: {
        addCount (context, payload) {
          console.log(context)
          console.log(payload)
          context.commit('addCount', payload)
        }
      },
      mutations: {
        addCount (state, payload = 1) {
          state.count += payload
        }
      }
    }
  }
})

export default store
