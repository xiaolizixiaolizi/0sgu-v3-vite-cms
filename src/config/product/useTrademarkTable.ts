import { ref, computed } from 'vue'
import LTable from '@/components/LTable/Index.vue'

export default () => {
  const selection = ref(false)
  const index = ref(true)
  const tableColumnConfig = ref([
    {
      prop: 'tmName',
      label: '品牌名称',
      align: 'center',
    },
    {
      prop: 'createTime',
      label: '创建时间',
      align: 'center',
    },
    {
      prop: 'updateTime',
      label: '更新时间',
      align: 'center',
    },
    {
      prop: 'logoUrl',
      label: '品牌logo',
      align: 'center',
      slotName: 'logoUrl',
    },
    {
      prop: 'operation',
      label: '操作',
      align: 'center',
      slotName: 'operation',
    },
  ])
  const paginationConfig = ref({
    showPagination: true, //是否显示分页器 默认显示
    position: 'left', //分页器的位置left|center|right 默认左边
    currentKey: '_page', //后端定义的[当前页]字段名 必填,
    pageSizeKey: '_limit', //后端定义的[每页条数]字段名 必填
    /**以下是el-pagination需要的参数 */
    background: true,
    currentPage: 1,
    pageSize: 10, //每页多少条数据
    pageSizes: [10, 20, 50, 100],
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
  })
  const apiConfig = computed(() => ({
    url: `/admin/product/baseTrademark/${paginationConfig.value.currentPage}/${paginationConfig.value.pageSize}`,
    method: 'get',
    params: {
      _page: paginationConfig.value.currentPage,
      _limit: paginationConfig.value.pageSize,
    },
  }))

  const LTableRef = ref<InstanceType<typeof LTable> | null>(null)

  const formatter = (res) => {
    paginationConfig.value.total = res.total
    //此时应该有返回值
    return res.records.map((item) => {
      return {
        id: item.id,
        createTime: item.createTime,
        logoUrl: item.logoUrl,
        tmName: item.tmName,
        updateTime: item.updateTime,
      }
    })
  }
  const fetchData = (isAdd = true) => {
    //如果是新增数据操作，插入的最新一条数据返回在第一页。如果在新增数据时候currentPage当前页不再第一页，即使新增了也看不到最新数据，需要手动切换到第一页。
    //编辑操作：currentPage当前页面操作，后端返回数据也在当前页显示
    if (isAdd) {
      paginationConfig.value.currentPage = 1
      paginationConfig.value.pageSize = 10
    }
    LTableRef.value?.fetchData()
  }
  return {
    index,
    selection,
    tableColumnConfig,
    paginationConfig,
    apiConfig,
    LTableRef,
    formatter,
    fetchData,
  }
}
