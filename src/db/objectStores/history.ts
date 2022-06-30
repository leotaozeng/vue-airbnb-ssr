import TypeObjectStore from '../type';

const webHistory = {
  keyPath: 'historyId',
  indexs: [
    'pictureURL',
    'city',
    'title',
    'price',
    'date',
    'nights',
    'guests',
    'infants'
  ]
};

const historyObjectStore: TypeObjectStore = {
  history: webHistory
};

export default historyObjectStore;
