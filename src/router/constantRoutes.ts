import { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Index.vue'
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', menuItemHidden: true },
    component: () => import('@/views/login/Index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    meta: { title: '首页', icon: 'user' },
    component: Layout,
  },
  {
    path: '/screen',
    name: 'Screen',
    meta: { title: '大屏', icon: 'user' },
    component: () => import('@/views/screen/Index.vue'),
  },
  {
    path: '/acl',
    name: 'Acl',
    meta: { title: '控制', icon: 'user' },
    component: Layout,
    children: [
      {
        path: '/acl/permission',
        name: 'Permission',
        meta: { title: '权限', icon: 'user' },
        component: () => import('@/views/acl/permission/Index.vue'),
      },
      {
        path: '/acl/role',
        name: 'Role',
        meta: { title: '角色', icon: 'user' },
        component: () => import('@/views/acl/role/Index.vue'),
      },
      {
        path: '/acl/user',
        name: 'User',
        meta: { title: '用户', icon: 'user' },
        component: () => import('@/views/acl/user/Index.vue'),
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    meta: { title: '商品', icon: 'goods' },
    component: Layout,
    children: [
      {
        path: '/product/attr',
        name: 'Attr',
        meta: { title: 'Attr', icon: 'user' },
        component: () => import('@/views/product/attr/Index.vue'),
      },
      {
        path: '/product/sku',
        name: 'Sku',
        meta: { title: 'Sku', icon: 'user' },
        component: () => import('@/views/product/sku/Index.vue'),
      },
      {
        path: '/product/spu',
        name: 'Spu',
        meta: { title: 'Spu', icon: 'user' },
        component: () => import('@/views/product/spu/Index.vue'),
      },
      {
        path: '/product/trademark',
        name: 'Trademark',
        meta: { title: 'Trademark', icon: 'user' },
        component: () => import('@/views/product/trademark/Index.vue'),
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/Index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notMatch',
    redirect: '/404',
  },
]

export default constantRoutes
