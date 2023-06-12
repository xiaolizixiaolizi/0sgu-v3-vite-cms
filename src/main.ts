if (isProd) console.log = noop
import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import './style/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { isProd, noop, toLine } from './utils'
import GlobalComponents from './components/Index'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
 
})


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon${toLine(key)}`, component)
}
import 'virtual:svg-icons-register'
app.use(GlobalComponents)

app.mount('#app')
