import { createRouter, createWebHistory } from 'vue-router';

const routes = [
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

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
