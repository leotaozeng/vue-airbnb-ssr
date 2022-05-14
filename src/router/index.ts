import {
  createMemoryHistory,
  createRouter,
  createWebHistory
} from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes
});

export default router;
