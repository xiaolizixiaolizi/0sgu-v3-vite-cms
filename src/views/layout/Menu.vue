<template>
  <el-menu
    @select="select"
    active-text-color="#409eff"
    background-color="#222d3c"
    class="el-menu-vertical-demo"
    :default-active="activeItem"
    text-color="#f4f4f5"
    unique-opened
    :collapse="false"
    router
  >
    <MenuItem :menu-list="menuList" />
  </el-menu>
</template>

<script lang="ts" setup name="Menu">
import MenuItem from './MenuItem.vue'
import { useMenuRouteStore } from '@/store/menuRouteStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const menuRouteStore = useMenuRouteStore()
const { menuRoutesShowed: menuList, activeItem } = storeToRefs(menuRouteStore)
const route = useRoute()
menuRouteStore.setActiveItem(route.path)
const select = (index: string) => {
  menuRouteStore.setActiveItem(index)
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  min-height: 400px;
}

// 展开那一项的所有背景色
:deep(.is-opened .el-menu--inline) {
  background: var(--menu-background-color);
}

//展开那一项所有字体颜色
:deep(.is-opened .el-menu--inline .el-menu-item) {
  color: #bfcbd9;
}

// 展开那一项 鼠标点击选中字体的颜色
:deep(.is-opened .el-menu--inline .is-active) {
  color: #409eff;
}

// 展开那一项鼠标hover的背景色
:deep(.is-opened .el-menu--inline .el-menu-item:hover) {
  background: #001528;
}
</style>
