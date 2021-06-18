/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：vue3-vite-demo
 * 文件名称：main.js
 * 创建日期：2021年06月16日
 * 创建作者：fuzzy
 */

import {createApp} from 'vue'
import App from './App.vue'
import {createI18n} from 'vue-i18n'
import {router} from './router'
import 'element-plus/packages/theme-chalk/src/base.scss'
import "@/assets/css/color-dark.css"
import installElementPlus from '@/plugins/element'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'
import messages from '@/utils/i18n'
import {store} from "@/store"
import mitt from 'mitt'

const app = createApp(App)

// mitt bus
app.config.globalProperties.mittBus = mitt()
app.config.globalProperties.customStorage = storage

// i18n
const i18n = createI18n({
  locale: localeZH.name,
  fallbackLocale: localeEN.name,
  messages,
})

// 加载ElementPlus
installElementPlus(app)

app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
