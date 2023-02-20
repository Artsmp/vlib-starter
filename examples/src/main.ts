// examples/src/main.ts
import { createApp } from 'vue'

// 测试全局导入
// import VantUI from 'vant'
// import VlibUI from '@artsmp/vlib-ui'
// import App from './App.vue'
// import 'vant/lib/index.css'
// import '@artsmp/vlib-ui/dist/index.css'
// const app = createApp(App)
// app.use(VantUI)
// app.use(VlibUI)
// app.mount('#app')

// 自动按需引入测试
import App from './App.vue'
const app = createApp(App)
app.mount('#app')
