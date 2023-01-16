import { createApp, createVNode } from 'vue'
import ElementPlus from 'element-plus'
import router from './router'
// import store from './store'
import App from './App.vue'
import 'normalize.css';
import 'element-plus/dist/index.css'
import * as Icons from "@element-plus/icons-vue";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";

const app = createApp(App)
app.use(ElementPlus, { size: 'default', zIndex: 3000 })
// app.use(store)
app.use(router)
app.use(VueClipboard)
app.mount('#app')
// 创建Icon组件
const Icon = (props) => {
    const { icon } = props
    return createVNode(Icons[icon])
}
// 注册Icon组件
app.component('Icon', Icon)