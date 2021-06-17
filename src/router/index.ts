import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/all'
  }, {
    path: '/all',
    component: () => import('../views/All.vue')
  }
  , {
    path: '/add',
    component: () => import('../views/Add.vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
