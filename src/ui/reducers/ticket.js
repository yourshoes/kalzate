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
import {
  SET_METHOD_TICKET_PAYMENTS_ACTION,
} from 'ui/containers/TicketPayments/constants';
import {
  SET_TICKET_GIVEN_AMOUNT_ACTION,
} from 'ui/containers/TicketTotal/constants';
import {
  UPDATE_STOCK_TICKET_DATA_ACTION,
  REMOVE_STOCK_FROM_TICKET_ACTION,
  REMOVE_TICKET_ACTION,
  ADD_STOCK_TO_TICKET_ACTION,
  UPDATE_TICKET_SUCCESS_ACTION,
} from 'ui/containers/TicketItems/constants';
import { PAYMENT_METHOD_CASH } from 'constants';

// The initial state of the App
const initialState = fromJS({
  payment: {
    method: null,
    totalAmount: '0.00',
    givenAmount: '0.00',
    returnAmount: '0.00',
    discount: 0, // from 0 to 1, i.e. 50% == 0.5
    tax: 0,  // from 0 to 1, i.e. 50% == 0.5
    currency: '€',
  },
  state: null, // sold, saved, refunded,
  items: [],
});

function setTicketGivenAmount(state, action) {
  const totalAmount = parseFloat(state.getIn(['payment', 'totalAmount']));
  const givenAmount = parseFloat(action.amount);
  const returnAmount = (givenAmount - totalAmount).toFixed(2);
  return state.updateIn(['payment', 'givenAmount'], () => givenAmount.toFixed(2)).updateIn(['payment', 'returnAmount'], () => returnAmount);
}

function updateTicketTotal(state) {
  if (state.get('items').size <= 0) {
    return state.updateIn(['payment', 'totalAmount'], () => '0.00').updateIn(['payment', 'givenAmount'], () => '0.00').updateIn(['payment', 'returnAmount'], () => '0.00').updateIn(['payment', 'method'], () => null);
  }
  const subtotal = state.get('items').map((item) => item.amount * item.price);
  const subtotalTaxesFree = subtotal.reduce((a, b) => a + b, 0);
  const subtotalWithDiscount = state.getIn(['payment', 'discount']) ? subtotalTaxesFree - (subtotalTaxesFree * state.getIn(['payment', 'discount'])) : subtotalTaxesFree;
  const subtotalWithTaxes = state.getIn(['payment', 'tax']) ? subtotalWithDiscount + (subtotalWithDiscount * state.getIn(['payment', 'tax'])) : subtotalWithDiscount;
  const totalAmount = subtotalWithTaxes.toFixed(2);
  const givenAmount = parseFloat(state.getIn(['payment', 'givenAmount']));
  const returnAmount = (givenAmount - totalAmount).toFixed(2);
  // console.log('total is', subtotalTaxesFree, subtotalWithDiscount, subtotalWithTaxes, totalAmount);
  return state.updateIn(['payment', 'totalAmount'], () => totalAmount).updateIn(['payment', 'returnAmount'], () => givenAmount > 0 ? returnAmount : '0.00');
}

function updateTicketData(state, action) {
  return state.update('items', (items) => items.map((item) => item.reference === action.item.reference ? ({ ...item, ...action.data }) : item));
}

function addStockToTicket(state, action) {
  const itemToAdd = { ...action.item, amount: 1 };
  return state.update('items', (items) => {
    const itemFound = items.find((item) => item.reference === itemToAdd.reference);

    if (!itemFound) { return items.push(itemToAdd); }

    return items.map((item) => item.reference === action.item.reference ? ({ ...item, amount: item.amount + 1 }) : item);
  });
}

function removeStockFromTicket(state, action) {
  return state.update('items', (items) => items.splice(action.positionInList, 1));
}

function removeTicket() {
  return initialState;
}

function setTicketPaymentMethod(state, action) {
  const paymentMethodState = state.updateIn(['payment', 'method'], () => action.method);

  if (action.method !== PAYMENT_METHOD_CASH) {
    return paymentMethodState.updateIn(['payment', 'givenAmount'], () => state.getIn(['payment', 'totalAmount'])).updateIn(['payment', 'returnAmount'], () => '0.00');
  }

  return paymentMethodState;
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TICKET_SUCCESS_ACTION:
      return updateTicketTotal(state, action);
    case UPDATE_STOCK_TICKET_DATA_ACTION:
      return updateTicketData(state, action);
    case ADD_STOCK_TO_TICKET_ACTION:
      // uncomment line below to remove sagas/tickets
      // return updateTicketTotal(addStockToTicket(state, action));
      return addStockToTicket(state, action);
    case REMOVE_STOCK_FROM_TICKET_ACTION:
      return removeStockFromTicket(state, action);
    case REMOVE_TICKET_ACTION:
      return removeTicket(state, action);
    case SET_METHOD_TICKET_PAYMENTS_ACTION:
      return setTicketPaymentMethod(state, action);
    case SET_TICKET_GIVEN_AMOUNT_ACTION:
      return setTicketGivenAmount(state, action);
    default:
      return state;
  }
}

export default appReducer;
