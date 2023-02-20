// examples/src/main.ts
import { createApp } from 'vue'
import VantUI from 'vant'
import VlibUI from '@artsmp/vlib-ui'
import App from './App.vue'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(VantUI)
app.use(VlibUI)
app.mount('#app')
