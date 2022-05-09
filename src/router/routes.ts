import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/Home/AircncHome.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/pages/Profile/AircncProfile.vue')
      }
    ]
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/pages/Auth/AircncLogin.vue')
  }
];

// Always leave this as last one
routes.push({
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: () => import('@/pages/AircncNotFound.vue')
});

export default routes;
