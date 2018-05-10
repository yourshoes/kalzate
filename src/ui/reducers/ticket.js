/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
// import { PAYMENT_METHOD_CREDIT_CARD } from 'ui/constants';
import { SET_METHOD_TICKET_PAYMENTS_ACTION } from 'ui/containers/TicketPayments/constants';
import { ADD_STOCK_TO_TICKET_ACTION } from 'ui/containers/StockItems/constants';

// The initial state of the App
const initialState = fromJS({
  payment: {
    method: null,
    totalAmount: 0,
    givenAmount: 0,
    discount: 0,
    tax: 21,
  },
  state: 'in progress', // sold, saved, refunded, in prrogres
  items: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STOCK_TO_TICKET_ACTION:
      return state.update('items', (items) => items.push(action.item));
    case SET_METHOD_TICKET_PAYMENTS_ACTION:
      return state.updateIn(['payment', 'method'], () => action.method);
    default:
      return state;
  }
}

export default appReducer;
