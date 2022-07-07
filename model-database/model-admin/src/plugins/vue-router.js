import { createWebHashHistory, createRouter } from "vue-router";
import LoginView from '../views/LoginView.vue';
import SampleView from '../views/SampleView.vue';
import UserView from '../views/UserView.vue';
import FieldDictView from "@/views/FieldDictView.vue";
import DynamicFormView from '@/views/DynamicFormView.vue'

// eslint-disable-next-line no-unused-vars
import EditorDialog from '../views/EditorDialog.vue';

const beforeEnter = (to, from, next) => {
  try {
    const token = localStorage.getItem('token');
    if(to.fullPath !== '/' && !token) {
      return next({fullPath: '/'});
    }
    return next();
  } catch(error) {
    return next({fullPath: '/'});
  }
}

const routes = [
  {path: '/', component: DynamicFormView},
  //{path: '/', component: LoginView},
  //{path: '/', component: FieldDictView},
  {path: '/login', component: LoginView},
  {path: '/samples', component: SampleView, beforeEnter},
  {path: '/users', component: UserView},
  {path: '/fielddict', component: FieldDictView, beforeEnter}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;