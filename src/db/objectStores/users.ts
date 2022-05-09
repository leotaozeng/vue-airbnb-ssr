import TypeObjectStore from '../type';

const webUser = {
  keyPath: 'id',
  indexs: ['phone', 'password', 'status']
};

const usersObjectStore: TypeObjectStore = {
  users: webUser
};

export default usersObjectStore;
