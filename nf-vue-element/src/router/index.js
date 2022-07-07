import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/eleBase',
    name: 'eleBase',
    component: () => import('../views/eleBase.vue')
  },
  {
    path: '/eleForm',
    name: 'eleForm',
    component: () => import('../views/eleForm.vue')
  },
  {
    path: '/eleFind',
    name: 'eleFind',
    component: () => import('../views/eleFind.vue')
  },
  {
    path: '/eleFindCom',
    name: 'eleFindCom',
    component: () => import('../views/eleFindCom.vue')
  },
  {
    path: '/eleGrid',
    name: 'eleGrid',
    component: () => import('../views/eleGrid.vue')
  },
  {
    path: '/helpForm',
    name: 'helpForm',
    component: () => import('../views/helpForm.vue')
  },
  {
    path: '/helpFind',
    name: 'helpFind',
    component: () => import('../views/helpFind.vue')
  },
  {
    path: '/crud',
    name: 'crud',
    component: () => import('../views/crud/index.vue'),
    children: [
      {
        path: ':moduleId',
        name: 'crud-list',
        props: true,
        component: () => import('../views/crud/data-list.vue')
      }
    ]
  },
  {
    path: '/websql',
    name: 'webSQL',
    component: () => import('../views/websql.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // base: '/nf-vue-element/',
  routes
})

console.log('创建路由——————', router)
export default router
