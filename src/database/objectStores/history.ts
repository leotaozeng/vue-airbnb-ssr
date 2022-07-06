import TypeObjectStore from '../type';

const webHistory = {
  keyPath: 'historyId',
  indexs: ['pictureURL', 'city', 'title', 'price', 'roomId']
};

const historyObjectStore: TypeObjectStore = {
  history: webHistory
};

export default historyObjectStore;
