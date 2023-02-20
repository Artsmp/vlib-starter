import type { App } from 'vue'
import { BackTop } from './back-top'

const components = [BackTop]

function install(app: App) {
  components.forEach((comp) => {
    if (comp.install!) {
      app.use(comp)
    } else {
      app.component(comp.name, comp)
    }
  })
}

export default { install, components }
