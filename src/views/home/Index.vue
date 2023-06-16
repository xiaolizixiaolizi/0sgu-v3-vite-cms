<template>
  <div>
    <h2>home</h2>
  </div>
</template>

<script setup lang="ts">
import { greet } from '@/utils'
import { ElNotification } from 'element-plus'
import { useLoginStore } from '@/store/loginStore'
import { storeToRefs } from 'pinia'
const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
ElNotification({
  title: greet(),
  message: userInfo.value.username,
  type: 'success',
})
</script>

<style scoped></style>
