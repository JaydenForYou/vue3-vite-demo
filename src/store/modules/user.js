/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：vue3-vite-demo
 * 文件名称：user.js
 * 创建日期：2021年06月18日
 * 创建作者：fuzzy
 */
import storage from "@/utils/storage"
const {getSession} = storage

export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  getters: {},
  mutations: {
    setThisUserInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async setUserInfo({commit}, data) {
      if (data) {
        commit('setThisUserInfo', data)
      } else {
        if (getSession("userInfo")) commit('setThisUserInfo', getSession())
      }
    }
  }
}
