import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 测试插件
import testPlugin from './plugins/test-plugin'

console.log('创建状态——————', store)

createApp(App)
  .use(store)
  .use(router)
  .use(testPlugin, { title: '测试一下插件' })
  .use(ElementPlus, { locale, size: 'small' })
  .mount('#app')
