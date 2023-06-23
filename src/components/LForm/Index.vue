<template>
  <el-form ref="formRef" v-bind="$attrs" :model="formData" class="l-form" label-suffix=" :">
    <el-form-item v-for="(item, index) in formConfig" :key="item.formItem ? item.formItem.prop : index" v-bind="item.formItem" :style="item.formItem.style">
      <slot v-if="item.component.is === 'slot'" :name="item.component.slotName"></slot>
      <component v-else :is="item.component.is" :class="item.component.class" :style="item.component.style" v-model="formData[item.formItem.prop]" v-bind="item.component">
        <!-- 下拉框 -->
        <template v-if="item.component.is === 'el-select'">
          <el-option v-for="(option, index) in item.component.options" :key="index" :label="option.label" :value="option.value" :disabled="option.disabled"></el-option>
        </template>
        <!--单选框 -->
        <template v-if="item.component.is === 'el-radio-group'">
          <el-radio v-for="(option, index) in item.component.options" :key="index" :label="option.value" :disabled="option.disabled" :border="option.border" :size="option.size" :name="option.name">
            {{ option.label }}
          </el-radio>
        </template>
        <!-- 多选框 -->
        <template v-if="item.component.is === 'el-checkbox-group'">
          <el-checkbox
            v-for="(option, index) in item.component.options"
            :key="index"
            :label="option.value"
            :disabled="option.disabled"
            :border="option.border"
            :size="option.size"
            :name="option.name || item.formItem.prop"
            :checked="option.checked"
            :indeterminate="option.indeterminate"
          >
            {{ option.label }}
          </el-checkbox>
        </template>
      </component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="LForm">
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'

export type Props = {
  formData: any
  formConfig: any
}
withDefaults(defineProps<Props>(), {
  formData: {},
  formConfig: [],
  rules: {} as any,
})
const formRef = ref<FormInstance>()
const validate = (...args) => formRef.value?.validate(...args)
const validateField = (...args) => formRef.value?.validateField(...args)
const resetFields = (...args) => formRef.value?.resetFields(...args)
const clearValidate = (...args) => formRef.value?.clearValidate(...args)

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
})
</script>

<style scoped></style>
