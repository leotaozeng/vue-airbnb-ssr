import TypeObjectStore from '../type';

const webReservation = {
  keyPath: 'reservationId',
  indexs: ['title', 'personNumber', 'pictureURL', 'price', 'date']
};

const reservationsObjectStore: TypeObjectStore = {
  reservations: webReservation
};

export default reservationsObjectStore;
