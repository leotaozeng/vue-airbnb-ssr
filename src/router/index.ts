import { airbnbDB } from '@/db';
import languagesObjectStore from '@/db/objectStores/languages';
import usersObjectStore from '@/db/objectStores/users';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (_to, _from, next) => {
  const response = await airbnbDB.open([
    languagesObjectStore,
    usersObjectStore
  ]);
  console.log('初始化所有对象仓库', response);
  next();
});

export default router;
