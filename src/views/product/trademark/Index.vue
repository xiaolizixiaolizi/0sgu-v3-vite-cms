<template>
  <div class="trade-mark-view">
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="el-icon-plus" style="margin-bottom: 20px" @click="setDialogFormVisible(true)">添加品牌</el-button>
      <l-table
        ref="LTableRef"
        :table-column-config="tableColumnConfig"
        :index="index"
        :selection="selection"
        :pagination-config="paginationConfig"
        :api-config="apiConfig"
        :formatter="formatter"
        border
        stripe
        height="400"
        element-loading-text="加载中..."
      >
        <template v-slot:logoUrl="scope">
          <el-image style="width: 40px; height: 40px" :src="scope.row.logoUrl" fit="fill" :preview-src-list="[scope.row.logoUrl]"></el-image>
        </template>
        <template v-slot:operation="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="operationMap['edit'](scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除么?" width="200px" placement="top" @confirm="operationMap['delete'](scope.row)">
            <template #reference>
              <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </l-table>
    </el-card>
    <!-- 新增弹窗 -->
    <el-dialog v-model="dialogConfig.dialogFormVisible" :title="dialogConfig.title" :close-on-click-modal="false" :destroy-on-close="true">
      <l-form :form-data="formData" :form-config="formConfig" :rules="rules" ref="lFormRef" label-width="100px" label-position="left"></l-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogResetAndClose" auto-insert-space>取消</el-button>
          <el-button type="primary" @click="dialogConfirmMap['add']()" auto-insert-space>确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialogConfig.dialogFormVisible" :title="editDialogConfig.title" :close-on-click-modal="false" :destroy-on-close="true">
      <l-form :form-data="editFormData" :form-config="editFormConfig" :rules="editRules" ref="editLFormRef" label-width="100px" label-position="left"></l-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogResetAndClose" auto-insert-space>取消</el-button>
          <el-button type="primary" @click="dialogConfirmMap['edit']()" auto-insert-space>确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Trademark">
import useTableTrademark from '@/config/product/useTrademarkTable'
import useDialogAddFormTrademark from '@/config/product/useTrademarkDialogAddForm'
import useTrademarkDialogEditForm from '@/config/product/useTrademarkDialogEditForm'
import { TradeMark } from '@/model/product'

const { index, selection, tableColumnConfig, paginationConfig, apiConfig, LTableRef, formatter, fetchData } = useTableTrademark()
const { lFormRef, formData, formConfig, rules, dialogConfig, setDialogFormVisible, dialogResetAndClose, validate } = useDialogAddFormTrademark()
const {
  lFormRef: editLFormRef,
  formData: editFormData,
  initFormData,
  formConfig: editFormConfig,
  rules: editRules,
  dialogConfig: editDialogConfig,
  setDialogFormVisible: editSetDialogFormVisible,
  dialogResetAndClose: editDialogResetAndClose,
  validate: editValidate,
} = useTrademarkDialogEditForm()
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'
/**
 * 表格操作按钮逻辑
 */
const operationMap = {
  edit: (row) => {
    initFormData(cloneDeep(row)) //赋值
    editSetDialogFormVisible(true) //打开编辑弹窗
  },
  delete: (row) => {
    console.log('log___row___log', row)
  },
}
/**
 * 新增｜编辑弹窗确认按钮逻辑
 */
const dialogConfirmMap = {
  add: async () => {
    const r = await validate()
    if (!r) return
    await TradeMark.create(formData.value)
    ElMessage({
      message: '新增数据成功',
      type: 'success',
    })
    dialogResetAndClose()
    fetchData()
  },
  edit: async () => {
    const r = await editValidate()
    if (!r) return
    await TradeMark.update(editFormData.value)
    ElMessage({
      message: '编辑数据成功',
      type: 'success',
    })

    editDialogResetAndClose()
    fetchData(false) //false表示不是新增数据操作
  },
}
</script>

<style scoped lang="scss"></style>
