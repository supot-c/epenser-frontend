import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    currentpage: 'root',
    token: null,
    isLoaded: false
  },
  mutations: {
    login (state, user) {
      state.isLogin = true
      state.user = user.user
      state.token = user.token
    },
    redirect (state, destination) {
      state.currentpage = destination
    },
    logout (state) {
      state.user = null
      state.isLogin = false
      state.token = null
      localStorage.removeItem('token')
      this.commit('redirect', 'root')
    }
  },
  actions: {
    login ({commit}, user) {
      localStorage.token = user.token
      commit('login', user)
    },
    redirect ({commit}, destination) {
      commit('redirect', destination)
    },
    logout ({commit}) {
      commit('logout')
    }
  }
})
