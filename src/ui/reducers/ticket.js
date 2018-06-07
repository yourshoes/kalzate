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
  LOAD_TICKET_SUCCESS_ACTION,
  ADD_STOCK_TO_TICKET_ACTION,
  UPDATE_TICKET_SUCCESS_ACTION,
  UPDATE_TICKET_TAX_ACTION,
  UPDATE_TICKET_DISCOUNT_ACTION,
} from 'ui/containers/TicketItems/constants';
import { PAYMENT_METHOD_CREDIT_CARD, PAYMENT_METHOD_CASH } from 'ui/constants';

// The initial state of the App
const initialState = {
  method: PAYMENT_METHOD_CREDIT_CARD,
  totalAmount: '0.00',
  givenAmount: '0.00',
  returnAmount: '0.00',
  discount: 0, // from 0 to 1, i.e. 50% == 0.5
  tax: 0,  // from 0 to 1, i.e. 50% == 0.5
  currency: '€',
  state: null, // sold, saved, refunded,
  items: [],
};

function setTicketGivenAmount(state, action) {
  const totalAmount = parseFloat(state.totalAmount);
  const givenAmount = parseFloat(action.amount);
  const returnAmount = (givenAmount - totalAmount).toFixed(2);
  return { ...state, givenAmount: givenAmount.toFixed(2), returnAmount };
}

function updateTicketTotal(state) {
  if (state.items.length <= 0) {
    return { ...state, totalAmount: '0.00', givenAmount: '0.00', returnAmount: '0.00', method: null };
  }
  const subtotal = state.items.map((item) => item.amount * item.price);
  const subtotalTaxesFree = subtotal.reduce((a, b) => a + b, 0);
  const subtotalWithDiscount = state.discount ? subtotalTaxesFree - (subtotalTaxesFree * state.discount) : subtotalTaxesFree;
  const subtotalWithTaxes = state.tax ? subtotalWithDiscount + (subtotalWithDiscount * state.tax) : subtotalWithDiscount;
  const totalAmount = subtotalWithTaxes.toFixed(2);
  const givenAmount = state.method !== PAYMENT_METHOD_CASH ? totalAmount : parseFloat(state.givenAmount);
  const returnAmount = (givenAmount - totalAmount).toFixed(2);
  // console.log('total is', subtotalTaxesFree, subtotalWithDiscount, subtotalWithTaxes, totalAmount);
  return { ...state, totalAmount, givenAmount, returnAmount: givenAmount > 0 ? returnAmount : '0.00' };
}

function updateTicketData(state, action) {
  return { ...state, items: state.items.map((item) => item.reference === action.item.reference ? ({ ...item, ...action.data }) : item) };
}

function updateTicketTax(state, action) {
  return { ...state, tax: action.tax / 100 };
}

function updateTicketDiscount(state, action) {
  return { ...state, discount: action.discount / 100 };
}

function addStockToTicket(state, action) {
  const itemFound = state.items.find((item) => item.reference === action.item.reference);
  if (itemFound) {
    // totalAmount field contains the total amount of stock units that item has
    // and is used later when checking out to update the stock, note
    // this will not work if the database is updated outside from the kalzate application
    // unless the client is synced
    const items = state.items.map((item) => item.reference === action.item.reference ? ({ ...item, amount: item.amount + 1, totalAmount: action.item.amount }) : item);
    return { ...state, items };
  }
  return {
    ...state, items: state.items.concat([{ ...action.item, amount: 1, totalAmount: action.item.amount }]),
  };
}

function removeStockFromTicket(state, action) {
  return {
    ...state,
    items: [
      ...state.items.slice(0, action.positionInList),
      ...state.items.slice(action.positionInList + 1),
    ],
  };
}

function removeTicket() {
  return initialState;
}

function loadTicket(state, action) {
  return action.ticket.toJSON();
}

function setTicketPaymentMethod(state, action) {
  if (action.method !== PAYMENT_METHOD_CASH) {
    return { ...state, method: action.method, givenAmount: state.totalAmount, returnAmount: '0.00' };
  }

  return { ...state, method: action.method };
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TICKET_SUCCESS_ACTION:
      return updateTicketTotal(state, action);
    case UPDATE_STOCK_TICKET_DATA_ACTION:
      return updateTicketData(state, action);
    case UPDATE_TICKET_TAX_ACTION:
      return updateTicketTax(state, action);
    case UPDATE_TICKET_DISCOUNT_ACTION:
      return updateTicketDiscount(state, action);
    case ADD_STOCK_TO_TICKET_ACTION:
      // uncomment line below to remove sagas/tickets
      // return updateTicketTotal(addStockToTicket(state, action));
      return addStockToTicket(state, action);
    case REMOVE_STOCK_FROM_TICKET_ACTION:
      return removeStockFromTicket(state, action);
    case REMOVE_TICKET_ACTION:
      return removeTicket(state, action);
    case LOAD_TICKET_SUCCESS_ACTION:
      return loadTicket(state, action);
    case SET_METHOD_TICKET_PAYMENTS_ACTION:
      return setTicketPaymentMethod(state, action);
    case SET_TICKET_GIVEN_AMOUNT_ACTION:
      return setTicketGivenAmount(state, action);
    default:
      return state;
  }
}

export default appReducer;
