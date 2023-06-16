import { createRouter, createWebHashHistory } from 'vue-router'
import constantRoutes from './constantRoutes'
import { useLoginStore } from '@/store/loginStore'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

router.beforeEach((to, from) => {
  if (to.path === '/login') return true //正常进入login页面
  const loginStore = useLoginStore()
  const token = loginStore.token
  if (!token) return '/login' //非login页面 还没有token就路由重定向到login
  return true //非login页面但是有token 正常走
})

export default router
