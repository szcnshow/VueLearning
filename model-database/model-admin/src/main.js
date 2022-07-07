import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import "./plugins/axios"
import router from "./plugins/vue-router";
import * as Icons from '@element-plus/icons'
import { createDynamicForms } from '@asigloo/vue-dynamic-forms';

const VueDynamicForms = createDynamicForms({
  // Global Options go here
});

export const app = createApp(App);

app.use(VueDynamicForms);

app.use(ElementPlus)
app.use(router);

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key]);
});

app.mount('#app')
