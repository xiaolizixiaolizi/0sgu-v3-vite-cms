import { App } from 'vue'
import SvgIcon from './SvgIcon/Index.vue'
import LForm from './LForm/Index.vue'
import LTable from './LTable/Index.vue'
export default {
  install(app: App) {
    app.component(SvgIcon.name, SvgIcon)
    app.component(LForm.name, LForm)
    app.component(LTable.name, LTable)
  },
}
