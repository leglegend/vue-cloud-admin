import { login } from '@/api/user'

const state = {}

const actions = {
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      login(payload)
        .then((res) => {
          commit('SET_DATA', res)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
  SET_DATA (state, res) {
    localStorage.setItem('token', res.token)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
