import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '*',
      component: () => import('@/views/index/Home'),
      children: [
        { path: '/product/create', component: () => import('@/views/product/Create') },
        { path: '/product/list/:page', component: () => import('@/views/product/List') },
        { path: '/product/edit/:id', component: () => import('@/views/product/Edit') },

        { path: '/order/list/:page', component: () => import('@/views/order/List') },
        { path: '/order/listInfo/:index', component: () => import('@/views/order/ListInfo') },
        { path: '/order/setting', component: () => import('@/views/order/Setting') },

        { path: '/user/list/:page', component: () => import('@/views/user/List') },

        { path: '/analysis/money', component: () => import('@/views/analysis/Money') },
        { path: '/analysis/order', component: () => import('@/views/analysis/Order') },

        { path: '/manager/managerinfo', component: () => import('@/views/manager/ManagerInfo') },
        { path: '/manager/managerset', component: () => import('@/views/manager/ManagerSet') },

        { path: '/information/infor', component: () => import('@/views/information/Infor') },
       
        { path: '*', component: () => import('@/views/index/Main') }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next();
  }
  const username = window.sessionStorage.getItem('username');
  if (!username) {
    return next('/login')
  }
  next();
})

export default router;