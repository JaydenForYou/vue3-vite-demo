/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：vue3-vite-demo
 * 文件名称：element.js
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */
import {
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElButton,
  ElDropdownItem, ElCol, ElRow, ElCard, ElTable, ElTableColumn, ElProgress, ElCheckbox
} from 'element-plus'

export default (app) => {
  app
    .use(ElButton)
    .use(ElTooltip)
    .use(ElDropdown)
    .use(ElDropdownMenu)
    .use(ElMenu)
    .use(ElSubmenu)
    .use(ElMenuItem)
    .use(ElDropdownItem)
    .use(ElCol)
    .use(ElRow)
    .use(ElCard)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElProgress)
    .use(ElCheckbox)
}
