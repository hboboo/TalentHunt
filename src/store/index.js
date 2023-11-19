import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,   // 用户是否认证（登录）的状态
    token: null,     // 用户认证的令牌（token）
    role: null,               // 用户角色
    userId: null,             // 用户唯一 ID
    baseImageUrl: 'http://localhost:3000',
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,  // 获取用户认证状态
    token: state => state.token,      // 获取用户令牌
    role: state => state.role, 
    userId: state => state.userId,    // 获取用户唯一 ID
  },
  mutations: {
    setAuthentication(state, { isAuthenticated, token, role, userId}) {
      // 修改用户认证状态和令牌
      state.isAuthenticated = isAuthenticated;
      state.token = token;
      state.role = role;
      state.userId = userId;
    },
  },
  actions: {
    login({ commit }, { isAuthenticated, token, role, userId}) {
       // 调用mutations中的setAuthentication方法来修改状态
      commit('setAuthentication', { isAuthenticated, token, role, userId});
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);
      
    },
    logout({ commit }) {
      commit('setAuthentication', { isAuthenticated: false, token: null, role: null ,userId: null });
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    },
  },
  modules: {
  }
})
