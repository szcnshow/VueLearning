import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import PhotoFormPage from './components/PhotoFormPage.vue'
import SearchPage from './components/SearchPage.vue'
import HomePage from './components/HomePage.vue'
import LoginPage from './components/LoginPage.vue'
//import { app } from 'electron'


const beforeEnter = (to, from, next) => {
  const loggedIn = localStorage.getItem('logged-in') === 'true';
  if (!loggedIn){
    return next({path: 'login'});
  }
  next();
};

const routes = [
  {path: '/add-photo-form', component: PhotoFormPage, beforeEnter},
  {path: '/edit-photo-form/:id', component: PhotoFormPage, beforeEnter},
  {path: '/search', component: SearchPage, beforeEnter},
  {path: '/', component: HomePage, beforeEnter},
  {path: '/login', component: LoginPage},
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount("#app")