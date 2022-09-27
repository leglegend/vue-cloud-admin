const state = {
  testCount: 1
}

const actions = {
  addCount (context, payload) {
    context.commit('addCount', payload)
  }
}

const mutations = {
  addCount (state, payload) {
    state += 1
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
