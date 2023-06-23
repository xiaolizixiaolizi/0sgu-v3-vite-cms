<template>
  <div class="l-table-container">
    <el-table :data="tableData" class="l-table" v-loading="loading" v-bind="$attrs" ref="LTableRef">
      <el-table-column type="selection" width="55" align="center" v-if="selection"></el-table-column>
      <el-table-column v-if="index" type="index" width="55" align="center" label="序号" :index="indexMethod"></el-table-column>
      <el-table-column v-for="item in tableColumnConfig" :key="item.prop" v-bind="item">
        <template #default="scope">
          <template v-if="!!item.slotName">
            <slot v-bind="scope" :name="item.slotName"></slot>
          </template>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <template v-slot:append="scope">
        <slot name="append" :scope="scope"></slot>
      </template>
    </el-table>
    <el-pagination
      v-if="!paginationConfig.hasOwnProperty('showPagination') || paginationConfig.showPagination === true"
      :class="[`is-${paginationConfig.position || 'left'}`]"
      v-bind="paginationConfig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts" name="LTable">
import type { TableInstance } from 'element-plus'
import { onMounted, ref, nextTick } from 'vue'
import Table from '@/model/table'
export type Props = {
  tableColumnConfig: any
  selection: boolean
  index: boolean
  paginationConfig: any
  apiConfig: any
  formatter: any
}

const props = withDefaults(defineProps<Props>(), {
  tableColumnConfig: [],
  selection: false,
  index: false,
  paginationConfig: {},
  apiConfig: {},
})
const LTableRef = ref<TableInstance>()
const loading = ref(false)
const tableData = ref([])
const fetchData = async () => {
  await nextTick()
  Table.fetchTableData(props.apiConfig)
    .then((res) => {
      if (props.formatter) tableData.value = props.formatter(res)
      else tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const handleSizeChange = (val) => {
  loading.value = true
  props.paginationConfig.pageSize = val
  props.paginationConfig.currentPage = 1 //改变每页条数，让页码重新归1
  props.apiConfig.params[props.paginationConfig.pageSizeKey] = val
  props.apiConfig.params[props.paginationConfig.currentKey] = 1
  fetchData()
}

const handleCurrentChange = (val) => {
  loading.value = true
  props.paginationConfig.currentPage = val
  props.apiConfig.params[props.paginationConfig.currentKey] = val
  fetchData()
}

const indexMethod = (index: number) => {
  // index索引从零开始，index +1即为当前数据序号
  props.paginationConfig.currentPage <= 0 ? (props.paginationConfig.currentPage = 1) : props.paginationConfig.currentPage
  // 如果当前不是第一页数据
  if (props.paginationConfig.currentPage != 1) {
    return index + 1 + (props.paginationConfig.currentPage - 1) * props.paginationConfig.pageSize
  }
  return index + 1
}
//@ts-ignore
const clearSelection = (...args) => LTableRef.value?.clearSelection(...args)
//@ts-ignore
const getSelectionRows = (...args) => LTableRef.value?.getSelectionRows(...args)
//@ts-ignore
const toggleRowSelection = (...args) => LTableRef.value?.toggleRowSelection(...args)
//@ts-ignore
const toggleAllSelection = (...args) => LTableRef.value?.toggleAllSelection(...args)
//@ts-ignore
const toggleRowExpansion = (...args) => LTableRef.value?.toggleRowExpansion(...args)
//@ts-ignore
const setCurrentRow = (...args) => LTableRef.value?.setCurrentRow(...args)
//@ts-ignore
const clearSort = (...args) => LTableRef.value?.clearSort(...args)
//@ts-ignore
const clearFilter = (...args) => LTableRef.value?.clearFilter(...args)
//@ts-ignore
const doLayout = (...args) => LTableRef.value?.doLayout(...args)
//@ts-ignore
const sort = (...args) => LTableRef.value?.sort(...args)
//@ts-ignore
const scrollTo = (...args) => LTableRef.value?.scrollTo(...args)
//@ts-ignore
const setScrollTop = (...args) => LTableRef.value?.setScrollTop(...args)
//@ts-ignore
const setScrollLeft = (...args) => LTableRef.value?.setScrollLeft(...args)

defineExpose({
  fetchData,
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft,
})
onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.l-table-container {
  display: flex;
  flex-flow: column nowrap;

  .l-table {
    flex: 1;
  }

  .el-pagination {
    margin-top: 20px;
    flex: 0 0 32px;
  }

  .is-left {
    align-self: flex-start;
  }

  .is-center {
    align-self: center;
  }

  .is-right {
    align-self: flex-end;
  }
}
</style>
