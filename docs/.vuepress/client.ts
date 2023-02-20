import { defineClientConfig } from '@vuepress/client'
import Vant from 'vant'
import VlibUI from '@artsmp/vlib-ui/src'

import 'vant/lib/index.css'
import '@artsmp/vlib-ui/src/index.scss'
export default defineClientConfig({
  enhance({ app }) {
    app.use(Vant)
    app.use(VlibUI)
  },
})
