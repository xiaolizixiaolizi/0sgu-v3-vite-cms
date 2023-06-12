import { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/Index.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

export default routes
