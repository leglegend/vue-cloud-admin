const state = {
  isMobile: false,
  isCollapse: false,
  withoutAnimation: false
}

const actions = {
  toggleAside(context: any, payload: any) {
    context.commit('TOGGLE_ASIDE', payload)
  },
  changeWithoutAnimation({ commit }, { withoutAnimation }) {
    commit('CHANGE_WITHOUT_ANIMATION', { withoutAnimation })
  },
  changeIsMobile({ commit }, { isMobile }) {
    commit('CHANGE_IS_MOBILE', { isMobile })
  }
}

const mutations = {
  TOGGLE_ASIDE(state, payload) {
    state.isCollapse = !state.isCollapse
    if (payload) state.withoutAnimation = payload.withoutAnimation
  },
  CHANGE_WITHOUT_ANIMATION(state: any, payload: any) {
    state.withoutAnimation = payload.withoutAnimation
  },
  CHANGE_IS_MOBILE(state: any, payload: any) {
    state.isMobile = payload.isMobile
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
