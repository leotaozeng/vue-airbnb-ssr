import IndexedDB from '@/utils/indexedDB';
import languagesObjectStore from './objectStores/languages';
import usersObjectStore from './objectStores/users';

// * 数据库实例
export const airbnbDB = new IndexedDB('airbnb');

export default {
  usersObjectStore,
  languagesObjectStore
};
