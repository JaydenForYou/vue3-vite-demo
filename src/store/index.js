/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：vue3-vite-demo
 * 文件名称：index.js
 * 创建日期：2021年06月16日
 * 创建作者：fuzzy
 */
import {createStore} from "vuex"
import login from "@/store/modules/login"
import layout from "@/store/modules/layout"
import user from '@/store/modules/user'

export const store = createStore({
  modules: {
    Login: login,
    Layout: layout,
    User: user
  }
})
