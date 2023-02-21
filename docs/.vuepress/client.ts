import { defineClientConfig } from '@vuepress/client'
import Vant from 'vant'
import VlibUI from '@art-test/vlib-ui/src'

import 'vant/lib/index.css'
import '@art-test/vlib-ui/src/index.scss'
export default defineClientConfig({
  enhance({ app }) {
    app.use(Vant)
    app.use(VlibUI)
  },
})
