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
        path: 'rooms/details/:id',
        name: 'RoomDetails',
        component: () => import('@/pages/RoomDetails/AircncRoomDetails.vue')
      },
      {
        path: 'reservation-center',
        name: 'Reservations',
        component: () => import('@/pages/Reservations/AircncReservations.vue')
      },
      {
        path: 'browsing-history',
        name: 'BrowsingHistory',
        component: () =>
          import('@/pages/BrowsingHistory/AircncBrowsingHistory.vue')
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
  component: () => import('@/pages/NotFound/AircncNotFound.vue')
});

export default routes;
