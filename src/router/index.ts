import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/Home/HomeIndex.vue') }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/Profile/ProfileIndex.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
