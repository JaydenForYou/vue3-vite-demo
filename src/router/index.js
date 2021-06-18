/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：vue3-vite-demo
 * 文件名称：index.js
 * 创建日期：2021年06月16日
 * 创建作者：fuzzy
 */

import {createRouter, createWebHashHistory} from 'vue-router'
import storage from '@/utils/storage.js'
import {store} from "@/store"

const {
  getSession
} = storage

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: "home",
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '系统首页',
      isLogin: false
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: '系统首页'
        },
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/:pathMatch(.*)',
        name: '404',
        meta: {
          title: '找不到页面'
        },
        component: () => import('@/views/error/404.vue')
      }
    ]
  }
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

// 登录状态保持和限制
router.beforeEach((to, from, next) => {
  const isLogin = getSession("token")
  if (isLogin && store.state.Login.isLogin) {
    next()
  } else {
    if (to.meta.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})
