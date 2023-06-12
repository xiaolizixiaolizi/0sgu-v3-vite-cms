import { ref, computed } from 'vue'

import LForm from '@/components/LForm/Index.vue'

export default () => {
  const lFormRef = ref<InstanceType<typeof LForm> | null>(null)
  const formData = ref({
    name: '',
    pasword: '',
  })
  const formConfig = ref([
    /** 输入框 input*/
    {
      /** fromItem数据项配置 ,里面传入form-item所有数据项*/
      formItem: {
        prop: 'name',
        label: '',
      },
      /**每个具体组件的prop数据项,is是指定是何种组件,  */
      component: {
        is: 'el-input',
        class: '',
        placeholder: '请输入名称',
        clearable: true,
        'prefix-icon': 'el-icon-user',
        /** 注意事件名前面统统加上on */
        onChange: (e) => {
          console.log('log___e___log', e)
        },
      },
    },
    {
      /** fromItem数据项配置 ,里面传入form-item所有数据项*/
      formItem: {
        prop: 'password',
        label: '',
      },
      /**每个具体组件的prop数据项,is是指定是何种组件,  */
      component: {
        is: 'el-input',
        class: '',
        placeholder: '请输入密码',
        clearable: true,
        'prefix-icon': 'el-icon-lock',
        'show-password': true,
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
        res[v.formItem.prop as any] = {
          //@ts-ignore
          required: v.formItem.required !== false,
          //@ts-ignore
          message: v.component.placeholder,
          trigger:
            ['el-input'].indexOf(v.component.is) !== -1 ? 'blur' : 'change',
        }
      }
    })
    return res
  })
  return {
    lFormRef,
    formData,
    formConfig,
    rules,
  }
}
