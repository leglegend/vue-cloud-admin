import { login } from '../../api/user'

const state = {}

const actions = {
  login({ commit }, payload: any) {
    return new Promise((resolve, reject) => {
      login(payload)
        .then(res => {
          commit('SET_DATA', res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const mutations = {
  SET_DATA(state: any, res: any) {
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
