import { getLanguageAPI } from '@/api/layouts';
import { airbnbDB } from '@/db';
import languagesObjectStore from '@/db/objectStores/languages';
import usersObjectStore from '@/db/objectStores/users';
import i18n from '@/i18n';
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

  const locale = useLocaleStore();
  const language = await getLanguageAPI();

  if (language && language.result) {
    const { name } = language.result;
    locale.setLanguage(name);
    i18n.global.locale = name;
  }

  next();
});

export default router;
