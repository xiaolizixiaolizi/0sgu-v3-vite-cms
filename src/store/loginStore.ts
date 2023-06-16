// stores/counter.js
import Login from '@/model/login'
import { defineStore } from 'pinia'
export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    token: '',
    userInfo: {} as any,
  }),

  actions: {
    async login(data) {
      const r = await Login.login(data)
      this.token = r.data.token
      await this.getUserInfo()
    },
    async getUserInfo() {
      const r = await Login.getUserInfo()
      this.userInfo = r.data.checkUser
      return r
    },
  },
  persist: true,
})
