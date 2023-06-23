<template>
  <div class="login-view">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <section class="login-box">
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <l-form :form-data="formData" :form-config="formConfig" :rules="rules" ref="lFormRef" label-width="0px">
            <template v-slot:buttonGroup>
              <el-button :style="{ width: '100%' }" type="primary" @click="onSubmit">登录</el-button>
            </template>
          </l-form>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Login">
import useFormConfig from '@/config/login/useFormConfig'
import router from '@/router'
import { useLoginStore } from '@/store/loginStore'
import { storeToRefs } from 'pinia'
const { formData, formConfig, rules, lFormRef } = useFormConfig()
const loginStore = useLoginStore()
const { activeItem } = storeToRefs(loginStore)
const onSubmit = async () => {
  const r = await lFormRef.value?.validate()?.catch((_) => false)
  if (!r) return
  loginStore.login(formData.value).then((_) => {
    router.push(activeItem.value)
  })
}
</script>

<style scoped lang="scss">
.login-view {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  section.login-box {
    width: 75%;
    margin-top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      font-size: 40px;
      color: #fff;
    }

    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }

    .el-form {
      padding: 0 40px;
    }
  }
}
</style>
