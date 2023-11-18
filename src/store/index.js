import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,   // 用户是否认证（登录）的状态
    token: null,     // 用户认证的令牌（token）
    role: null,               // 用户角色
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,  // 获取用户认证状态
    token: state => state.token,      // 获取用户令牌
    role: state => state.role, 
  },
  mutations: {
    setAuthentication(state, { isAuthenticated, token, role}) {
      // 修改用户认证状态和令牌
      state.isAuthenticated = isAuthenticated;
      state.token = token;
      state.role = role;
    },
  },
  actions: {
    login({ commit }, { isAuthenticated, token, role}) {
       // 调用mutations中的setAuthentication方法来修改状态
      commit('setAuthentication', { isAuthenticated, token, role});
       // 将 token 存储到本地存储中
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    },
    logout({ commit }) {
      commit('setAuthentication', { isAuthenticated: false, token: null, role: null });
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  modules: {
  }
})
