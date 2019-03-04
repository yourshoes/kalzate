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

// import { PAYMENT_METHOD_CREDIT_CARD } from 'config';
import { omit } from 'lodash';
import { SET_METHOD_TICKET_PAYMENTS_ACTION } from 'containers/TicketPayments/constants';
import {
  SET_TICKET_GIVEN_AMOUNT_ACTION,
  INCREASE_TICKET_GIVEN_AMOUNT_ACTION,
  DECREASE_TICKET_GIVEN_AMOUNT_ACTION,
} from 'containers/TicketTotal/constants';
import {
  UPDATE_STOCK_TICKET_DATA_ACTION,
  REMOVE_STOCK_FROM_TICKET_ACTION,
  REMOVE_TICKET_ACTION,
  LOAD_TICKET_SUCCESS_ACTION,
  ADD_STOCK_TO_TICKET_ACTION,
  UPDATE_TICKET_SUCCESS_ACTION,
  UPDATE_TICKET_TAX_ACTION,
  UPDATE_TICKET_DISCOUNT_ACTION,
} from 'containers/TicketItems/constants';
import {
  RETURN_STOCK_FROM_TICKET_ACTION,
  UNDO_RETURN_STOCK_FROM_TICKET_ACTION,
  RETURN_ALL_STOCK_FROM_TICKET_ACTION,
} from 'containers/TicketSoldItems/constants';
import { PAYMENT_METHOD_CREDIT_CARD, PAYMENT_METHOD_CASH, TICKET_SOLD_STATE } from 'config';
import { toFixed } from 'utils/helper';
// The initial state of the App
const initialState = {
  method: PAYMENT_METHOD_CREDIT_CARD,
  totalAmount: '0.00',
  givenAmount: '0.00',
  returnAmount: '0.00',
  discount: 0, // from 0 to 1, i.e. 50% == 0.5
  tax: 0, // from 0 to 1, i.e. 50% == 0.5
  currency: '€',
  state: null, // sold, saved, refunded,
  items: [],
  relatesTo: '',
};

function increaseTicketGivenAmount(state, action) {
  if (!action.by) {
    return state;
  }
  const totalAmount = parseFloat(state.totalAmount);
  const givenAmount = parseFloat(state.givenAmount);
  const givenAmountIncrease = (givenAmount + action.by).toFixed(2);
  if (givenAmountIncrease >= 999.99) {
    return state;
  }
  const returnAmount = (parseFloat(givenAmountIncrease) - totalAmount).toFixed(2);
  return { ...state, givenAmount: givenAmountIncrease, returnAmount };
}

function decreaseTicketGivenAmount(state, action) {
  if (!action.by) {
    return state;
  }
  const totalAmount = parseFloat(state.totalAmount);
  const givenAmount = parseFloat(state.givenAmount);
  const givenAmountDecrease = (givenAmount - action.by).toFixed(2);
  if (givenAmountDecrease <= 0) {
    return state;
  }
  const returnAmount = (parseFloat(givenAmountDecrease) - totalAmount).toFixed(2);
  return { ...state, givenAmount: givenAmountDecrease, returnAmount };
}

function setTicketGivenAmount(state, action) {
  if (!action.amount) {
    return { ...state, givenAmount: '', returnAmount: '0.00' };
  }
  const totalAmount = parseFloat(state.totalAmount);
  const givenAmountFixed = toFixed(action.amount, 2, state.givenAmount);
  const givenAmount = parseFloat(givenAmountFixed);
  const returnAmount = (givenAmount - totalAmount).toFixed(2);
  return { ...state, givenAmount: givenAmountFixed, returnAmount };
}

function updateGivenAmount(state, totalAmount) {
  if (state.state === TICKET_SOLD_STATE) {
    return '0.00';
  }
  return state.method !== PAYMENT_METHOD_CASH ? totalAmount : parseFloat(state.givenAmount);
}

function updateReturnAmount(state, givenAmount, totalAmount) {
  // const returnAmount = (Math.abs(givenAmount) - Math.abs(totalAmount)).toFixed(2);
  const returnAmount = (givenAmount - totalAmount).toFixed(2);
  if (state.state === TICKET_SOLD_STATE) {
    return returnAmount;
  }
  return givenAmount > 0 ? returnAmount : '0.00';
}

function updateTicketTotal(state) {
  if (state.items.length <= 0) {
    return {
      ...state,
      totalAmount: '0.00',
      givenAmount: '0.00',
      returnAmount: '0.00',
      method: null,
    };
  }
  const subtotalToAdd = state.items
    .filter((item) => item.added)
    .map((item) => item.amount * item.price - (item.discount || 0))
    .reduce((a, b) => a + b, 0);
  const subtotalToReturn = state.items
    .filter((item) => item.toReturn)
    .map((item) => item.amount_return * item.price - (item.discount || 0))
    .reduce((a, b) => a + b, 0);
  console.log(state, subtotalToAdd, subtotalToReturn);
  const subtotalTaxesFree = subtotalToAdd - subtotalToReturn;
  const subtotalWithDiscount = state.discount
    ? subtotalTaxesFree - subtotalTaxesFree * state.discount
    : subtotalTaxesFree;
  const subtotalWithTaxes = state.tax
    ? subtotalWithDiscount + subtotalWithDiscount * state.tax
    : subtotalWithDiscount;
  const totalAmount = subtotalWithTaxes.toFixed(2);
  const givenAmount = updateGivenAmount(state, totalAmount);
  const returnAmount = updateReturnAmount(state, givenAmount, totalAmount);
  // console.log('total is', subtotalTaxesFree, subtotalWithDiscount, subtotalWithTaxes, totalAmount);
  return { ...state, totalAmount, givenAmount, returnAmount };
}

function updateTicketData(state, action) {
  return {
    ...state,
    items: state.items.map((item) =>
      item.reference === action.item.reference ? { ...item, ...action.data } : item
    ),
  };
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
    const items = state.items.map((item) =>
      item.reference === action.item.reference ? { ...item, amount: item.amount + 1 } : item
    );
    return { ...state, items };
  }

  return { ...state, items: state.items.concat([{ ...action.item, amount: 1, added: true }]) };
  // if(state.state === TICKET_SOLD_STATE){
  //   return {...state, items: state.items.concat([{ ...action.item, amount: 1, added: true }])}
  // }

  // return {
  //   ...state, items:state.items.concat([{ ...action.item, amount: 1 }]),
  // };
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

function returnStockFromTicket(state, action) {
  const items = state.items.map((item) =>
    item.reference === action.item.reference
      ? { ...item, amount_return: item.amount, amount: -item.amount, toReturn: true }
      : { ...item, added: true }
  );
  return {
    ...state,
    items,
  };
}

function returnAllStockFromTicket(state) {
  const items = state.items.map((item) =>
    !item.toReturn && !item.added
      ? { ...item, amount_return: item.amount, amount: -item.amount, toReturn: true }
      : item
  );
  return {
    ...state,
    items,
  };
}

function undoReturnStockFromTicket(state, action) {
  const items = state.items.map((item) =>
    item.reference === action.item.reference
      ? omit({ ...item, amount: item.amount_return }, ['amount_return', 'toReturn'])
      : omit(item, 'added')
  );
  return {
    ...state,
    items,
  };
}

function removeTicket() {
  return initialState;
}

function loadTicket(state, action) {
  return action.ticket.toJSON();
}

function setTicketPaymentMethod(state, action) {
  if (state.state === TICKET_SOLD_STATE) {
    return { ...state, method: action.method };
  }

  if (state.totalAmount <= 0) {
    return { ...state, method: action.method, givenAmount: '0.00', returnAmount: '0.00' };
  }

  if (action.method !== PAYMENT_METHOD_CASH) {
    return {
      ...state,
      method: action.method,
      givenAmount: state.totalAmount,
      returnAmount: '0.00',
    };
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
    case RETURN_ALL_STOCK_FROM_TICKET_ACTION:
      return returnAllStockFromTicket(state, action);
    case RETURN_STOCK_FROM_TICKET_ACTION:
      return returnStockFromTicket(state, action);
    case UNDO_RETURN_STOCK_FROM_TICKET_ACTION:
      return undoReturnStockFromTicket(state, action);
    case REMOVE_TICKET_ACTION:
      return removeTicket(state, action);
    case LOAD_TICKET_SUCCESS_ACTION:
      return loadTicket(state, action);
    case SET_METHOD_TICKET_PAYMENTS_ACTION:
      return setTicketPaymentMethod(state, action);
    case SET_TICKET_GIVEN_AMOUNT_ACTION:
      return setTicketGivenAmount(state, action);
    case INCREASE_TICKET_GIVEN_AMOUNT_ACTION:
      return increaseTicketGivenAmount(state, action);
    case DECREASE_TICKET_GIVEN_AMOUNT_ACTION:
      return decreaseTicketGivenAmount(state, action);
    default:
      return state;
  }
}

export default appReducer;
