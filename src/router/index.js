import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue'),
        meta: {
          title: 'FUTURE MALL｜未來商城',
        },
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
        meta: {
          title: '產品列表｜FUTURE MALL',
        },
      },
      {
        path: 'product/:id',
        component: () => import('../views/Product.vue'),
        meta: {
          title: '產品訊息｜FUTURE MALL',
        },
      },
      {
        path: 'order',
        component: () => import('../views/Order.vue'),
        meta: {
          title: '購物訂單｜FUTURE MALL',
        },
      },
      {
        path: 'getcoupon',
        component: () => import('../views/Coupon.vue'),
        meta: {
          title: '優惠劵｜FUTURE MALL',
        },
      },
      {
        path: 'favorite',
        component: () => import('../views/Favorite.vue'),
        meta: {
          title: '我的收藏｜FUTURE MALL',
        },
      },
    ],
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
      {
        path: 'order',
        component: () => import('../views/backend/Order.vue'),
      },
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
    meta: {
      title: '404 - FUTURE MALL｜未來商城',
    },
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
