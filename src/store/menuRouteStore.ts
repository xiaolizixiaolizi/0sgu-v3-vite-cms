// stores/counter.js
import { defineStore } from 'pinia'
import constantRoutes from '@/router/constantRoutes'
export const useMenuRouteStore = defineStore('menuRouteStore', {
  state: () => ({
    menuRoutes: constantRoutes, //layout菜单路由
    activeItem: '', //默认激活菜单项目
  }),
  getters: {
    menuRoutesShowed(state) {
      return state.menuRoutes.filter((item) => {
        if (!item.meta) return false
        if (item.meta.menuItemHidden) return false
        return true
      })
    },
  },

  actions: {
    setActiveItem(activeItem: string) {
      this.activeItem = activeItem
    },
  },
  persist: true,
})
