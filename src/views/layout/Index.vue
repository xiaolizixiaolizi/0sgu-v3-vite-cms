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
          <el-button icon="el-icon-full-screen" circle @click="toggle"></el-button>
          <el-button icon="el-icon-setting" circle></el-button>
          <el-avatar :size="34" :src="userInfo.avatar" style="margin: 0 8px" />
          <el-dropdown trigger="hover" style="align-items: center" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userInfo.username }}
              <el-icon-arrow-down class="el-icon--right"></el-icon-arrow-down>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <HomeView v-if="isHomeView" />

          <router-view v-else v-slot="{ Component, route }">
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
import { nextTick, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import { useLoginStore } from '@/store/loginStore'
import Menu from './Menu.vue'
import { storeToRefs } from 'pinia'
import HomeView from '@/views/home/Index.vue'
import router from '@/router'
const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
const { toggle } = useFullscreen()
const route = useRoute()
const isHomeView = computed(() => route.name === 'layout')
const matchRouted = computed(() => route.matched)
const isShowRouterView = ref(true) //路由刷新
const refresh = async () => {
  isShowRouterView.value = false
  await nextTick()
  isShowRouterView.value = true
}
const handleCommand = async (command: string | number | object) => {
  console.log(`click on item ${command}`)
  await loginStore.logout()
  router.push({ name: 'login' })
}
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

.el-dropdown-link:focus-visible {
  outline: 0;
}
</style>
