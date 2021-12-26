import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'home',
        name: 'dashboardHome',
        component: () => import('../views/backend/Home.vue'),

      },
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),

      },
      // {
      //   path: 'order',
      //   component: () => import('../views/backend/Order.vue'),

      // },
      {
        path: 'coupon',
        component: () => import('../views/backend/Coupon.vue'),

      },
    ],
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/404.vue'),
  },
  // 重新導向
  {
    path: '/dashboard/:pathMatch(.*)*',
    redirect: {
      name: 'dashboardHome',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
