import { ref, computed } from 'vue'

import LForm from '@/components/LForm/Index.vue'

export default () => {
  const lFormRef = ref<InstanceType<typeof LForm> | null>(null)
  const formData = ref({
    tmName: '',
    logoUrl: '',
  })
  const formConfig = ref([
    /** 输入框 input*/
    {
      /** fromItem数据项配置 ,里面传入form-item所有数据项*/
      formItem: {
        prop: 'tmName',
        label: '品牌名称',
      },
      /**每个具体组件的prop数据项,is是指定是何种组件,  */
      component: {
        is: 'el-input',
        class: '',
        placeholder: '请输入name',
        clearable: true,
        autocomplete: 'off',
        /** 注意事件名前面统统加上on */
        // onChange: (e) => {
        // },
      },
    },
    {
      /** fromItem数据项配置 ,里面传入form-item所有数据项*/
      formItem: {
        prop: 'logoUrl',
        label: '上传logo',
      },
      /**每个具体组件的prop数据项,is是指定是何种组件,  */
      component: {
        is: 'el-select',
        class: '',
        placeholder: '请输入Zones',
        clearable: true,
        options: [
          { label: 'Zone No.1', value: 'shanghai' },
          { label: 'Zone No.2', value: 'beijing' },
        ],
        onChange: (e) => {},
      },
    },

    /** 传入插槽 */
    {
      formItem: {},
      component: {
        is: 'slot',
        slotName: 'buttonGroup',
      },
    },
  ])

  const rules = computed(() => {
    const res = {}
    formConfig.value.forEach((v) => {
      if (v.component.is !== 'slot') {
        res[v.formItem.prop as any] = [
          {
            //@ts-ignore
            required: v.formItem.required !== false,
            //@ts-ignore
            message: v.component.placeholder,
            trigger:
              ['el-input'].indexOf(v.component.is) !== -1 ? 'blur' : 'change',
          },
        ]
      }
    })
    return res
  })

  /**
   * 二次补充rules字段
   */
  rules.value['tmName'].push({
    min: 2,
    message: '品牌名称不少于2位',
    trigger: 'blur',
  })

  const dialogConfig = ref({
    title: '添加品牌',
    dialogFormVisible: false,
  })
  const dialogResetAndClose = () => {
    lFormRef.value?.resetFields()
    setDialogFormVisible(false)
  }

  const setDialogFormVisible = (visible: boolean) =>
    (dialogConfig.value.dialogFormVisible = visible)
  const validate = async () => {
    const r = await lFormRef.value?.validate().catch((_) => false) //验证通过返回ture，失败返回false
    return r
  }

  return {
    lFormRef,
    formData,
    formConfig,
    rules,
    dialogConfig,
    setDialogFormVisible,
    dialogResetAndClose,
    validate,
  }
}
