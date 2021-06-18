/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：vue3-vite-demo
 * 文件名称：login.js
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */

export default {
  namespaced: true,
  state: {
    isLogin: false
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    setLogin(state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    async setLoginStatus({commit}, flag) {
      commit("setLogin", flag)
    }
  }
}
