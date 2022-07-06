import TypeObjectStore from '../type';

const webUser = {
  keyPath: 'userId',
  indexs: ['phone', 'password', 'status']
};

const usersObjectStore: TypeObjectStore = {
  users: webUser
};

export default usersObjectStore;
