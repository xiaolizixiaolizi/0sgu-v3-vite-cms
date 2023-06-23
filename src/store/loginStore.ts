import Login from '@/model/login'
import constantRoutes from '@/router/constantRoutes'
import { defineStore } from 'pinia'
export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    token: '',
    userInfo: {} as any,
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
    setToken(token) {
      this.token = token
    },
    setUserInfo(obj) {
      this.userInfo = obj
    },
    setMenuList(list) {
      this.menuRoutes = list
    },
    resetLoignState() {
      this.setToken('')
      this.setUserInfo({})
      // this.menuRoutes=[]
    },
    async login(data) {
      const r = await Login.login(data)
      this.setToken(r)
      await this.getUserInfo()
      await this.getMenu()
    },
    async getUserInfo() {
      const r = await Login.getUserInfo()
      this.setUserInfo(r)
      return r
    },
    async getMenu() {
      const r = await Login.getMenu()
      console.log('log___r___log', r)
    },
    async logout() {
      await Login.logout()
      this.resetLoignState()
    },
  },
  persist: {
    paths: ['token', 'userInfo', 'activeItem'],
  },
})
