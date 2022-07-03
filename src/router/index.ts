import {
  createMemoryHistory,
  createRouter,
  createWebHistory
} from 'vue-router';
import routes from './routes';

export function createSSRRouter() {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  });
}
