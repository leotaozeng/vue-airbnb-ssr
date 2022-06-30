import IndexedDB from '@/utils/indexedDB';
import historyObjectStore from './objectStores/history';
import languagesObjectStore from './objectStores/languages';
import reservationsObjectStore from './objectStores/reservations';
import usersObjectStore from './objectStores/users';

// 数据库实例
export const airbnbDB = new IndexedDB('airbnb');

export {
  usersObjectStore,
  historyObjectStore,
  languagesObjectStore,
  reservationsObjectStore
};
