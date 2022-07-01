import TypeObjectStore from '../type';

const webReservation = {
  keyPath: 'reservationId',
  indexs: [
    'pictureURL',
    'city',
    'title',
    'price',
    'date',
    'nights',
    'guests',
    'infants',
    'roomId'
  ]
};

const reservationsObjectStore: TypeObjectStore = {
  reservations: webReservation
};

export default reservationsObjectStore;
