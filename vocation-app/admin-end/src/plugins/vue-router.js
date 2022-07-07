import { createWebHashHistory, createRouter } from "vue-router";
import LoginView from '../views/LoginView.vue';
import BookingView from '../views/BookingView.vue';
import CatalogView from '../views/CatalogView.vue';

const beforeEnter = (to, from, next) => {
  try {
    const token = localStorage.getItem('token');
    if(to.fullPath !== '/' && !token) {
      return next({fiulPath: '/'});
    }
    return next();
  } catch(error) {
    return next({fullPath: '/'});
  }
}

const routes = [
  {path: '/', component: LoginView},
  {path: '/bookings', component: BookingView, beforeEnter},
  {path: '/catalog', component: CatalogView, beforeEnter},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;