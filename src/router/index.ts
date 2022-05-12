import { airbnbDB } from '@/db';
import languagesObjectStore from '@/db/objectStores/languages';
import usersObjectStore from '@/db/objectStores/users';
import { useLocaleStore } from '@/stores/locale';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (_to, _from, next) => {
  // * 初始化所有对象仓库
  await airbnbDB.open([languagesObjectStore, usersObjectStore]);

  // * 初始化语言
  const localeStore = useLocaleStore();
  localeStore.getLanguage();

  next();
});

export default router;
