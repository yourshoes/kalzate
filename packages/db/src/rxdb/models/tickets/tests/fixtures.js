export const validTicketDocument = {
  method: 'cash',
  totalAmount: '23.75',
  givenAmount: '25.00',
  returnAmount: '1.25',
  discount: 0, // from 0 to 1, i.e. 50% == 0.5
  tax: 0.21, // from 0 to 1, i.e. 50% == 0.5
  currency: '€',
  state: 'SAVED', // sold, saved, refunded,
  items: [{
    reference: 'reference',
    brand: 'brand',
    size: 30,
    amount: 1,
    price: 23.75,
    gender: 'man',
    colors: ['white'],
  }],
};

export const noItemsTicketDocument = {
  method: 'cash',
  totalAmount: '0.00',
  givenAmount: '0.00',
  returnAmount: '0.00',
  discount: 0, // from 0 to 1, i.e. 50% == 0.5
  tax: 0, // from 0 to 1, i.e. 50% == 0.5
  currency: '€',
  state: 'SAVED', // sold, saved, refunded,
  items: null,
};

export const noMethodTicketDocument = {
  method: null,
  totalAmount: '0.00',
  givenAmount: '0.00',
  returnAmount: '0.00',
  discount: 0, // from 0 to 1, i.e. 50% == 0.5
  tax: 0, // from 0 to 1, i.e. 50% == 0.5
  currency: '€',
  state: 'SAVED', // sold, saved, refunded,
  items: [{
    reference: 'reference',
    brand: 'brand',
    size: 30,
    amount: 10,
    price: 39.99,
    gender: 'man',
    colors: ['white'],
  }],
};
