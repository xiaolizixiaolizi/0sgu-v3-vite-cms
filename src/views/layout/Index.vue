<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px">
      <el-scrollbar>
        <Menu />
      </el-scrollbar>
    </el-aside>

    <el-container class="my-container">
      <el-header>
        <div class="left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in matchRouted" :key="index">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <el-button icon="el-icon-refresh" circle @click="refresh"></el-button>
          <el-button size="default" icon="el-icon-full-screen" circle @click="toggle"></el-button>
          <el-button type="primary" size="default">333</el-button>
          <el-button type="primary" size="default">444</el-button>
          <el-button type="primary" size="default">555</el-button>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view v-slot="{ Component, route }">
            <transition name="fade">
              <!-- 路由刷新v-if -->
              <component :is="Component" :key="route.path" v-if="isShowRouterView" />
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import Menu from './Menu.vue'
const { toggle } = useFullscreen()
const route = useRoute()
let matchRouted = ref()
const isShowRouterView = ref(true)
const refresh = async () => {
  isShowRouterView.value = false
  await nextTick()
  isShowRouterView.value = true
}

watch(
  () => route.path,
  () => {
    matchRouted.value = route.matched
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.layout-container-demo {
  height: 100vh;
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--menu-background-color);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.my-container > .el-main {
  padding: 20px 0 0 20px;
}

.layout-container-demo .my-container {
  .el-header {
    color: var(--el-text-color-primary);
    display: flex;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color);

    .left {
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
