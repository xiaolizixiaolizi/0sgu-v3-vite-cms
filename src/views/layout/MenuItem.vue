<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 要么是有下级菜单 -->
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
        <template #title>
          <component :is="`el-icon-${item.meta?.icon}`"></component>
          <span>{{ item.meta?.title }}</span>
        </template>
        <!-- 都删了 直接递归 -->
        <MenuItem :menu-list="item.children" />
      </el-sub-menu>

      <!-- 要么直接就是一级菜单 -->
      <el-menu-item v-else :index="item.path">
        <component v-if="item.meta?.icon" :is="`el-icon-${item.meta?.icon}`"></component>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts" name="MenuItem">
export type Props = {
  menuList: any
}
withDefaults(defineProps<Props>(), {
  menuList: [],
})
</script>

<style scoped></style>
