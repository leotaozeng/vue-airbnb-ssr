// * mounts the app to a DOM element
import { airbnbDB } from './db';
import languagesObjectStore from './db/objectStores/languages';
import usersObjectStore from './db/objectStores/users';
import { createApp } from './main';
import { useLocaleStore } from './stores/locale';

const { app, router } = createApp();

router.beforeEach(async (_to, _from, next) => {
  // * 初始化所有对象仓库
  await airbnbDB.open([languagesObjectStore, usersObjectStore]);

  // * 初始化语言
  const localeStore = useLocaleStore();
  localeStore.getLanguage();

  next();
});

// * wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app');
});
