import TypeObjectStore from '../type';

const webUser: TypeObjectStore = {
  keyPath: 'id',
  indexs: ['phone', 'password', 'status']
};

const usersObjectStore = {
  users: webUser
};

export default usersObjectStore;
