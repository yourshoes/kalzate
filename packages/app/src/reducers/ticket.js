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
  REMOVE_TICKET_ACTION,
  LOAD_TICKET_SUCCESS_ACTION,
  UPDATE_TICKET_SUCCESS_ACTION,
  UPDATE_TICKET_TAX_ACTION,
  UPDATE_TICKET_DISCOUNT_ACTION,
} from 'containers/TicketSellingPage/constants';
import {
  RETURN_STOCK_FROM_TICKET_ACTION,
  UNDO_RETURN_STOCK_FROM_TICKET_ACTION,
  RETURN_ALL_STOCK_FROM_TICKET_ACTION,
} from 'containers/TicketReturningPage/constants';
import { PAYMENT_METHOD_CASH, TICKET_SOLD_STATE } from 'config';
import { toFixed } from 'utils/helper';
import {
  ADD_STOCK_TO_TICKET_ACTION,
  UPDATE_TICKET_OPERATION_ACTION,
  REMOVE_STOCK_FROM_TICKET_ACTION,
  UPDATE_TICKET_PAYMENT_ACTION
} from 'actions/tickets/types';

// The initial state of the App
const initialState = {

  isChecked: false,
  isGift: false,
  isVoucher: false,
  balance: null,
  prevNode: undefined,
  nextNode: undefined,
  payments: [],
  operations: [],

  // method: PAYMENT_METHOD_CREDIT_CARD,
  // totalAmount: '0.00',
  // givenAmount: '0.00',
  // returnAmount: '0.00',
  // discount: 0, // from 0 to 1, i.e. 50% == 0.5
  // tax: 0, // from 0 to 1, i.e. 50% == 0.5
  // currency: '€',
  // state: null, // sold, saved, refunded,
  // items: [],
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
  if (state.state === TICKET_SOLD_STATE || totalAmount < 0) {
    return '0.00';
  }
  return state.method !== PAYMENT_METHOD_CASH ? totalAmount : parseFloat(state.givenAmount);
}

function updateReturnAmount(state, givenAmount, totalAmount) {
  // const returnAmount = (Math.abs(givenAmount) - Math.abs(totalAmount)).toFixed(2);
  const returnAmount = (givenAmount - totalAmount).toFixed(2);
  if (state.state === TICKET_SOLD_STATE || totalAmount < 0) {
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
  console.log(totalAmount, givenAmount, returnAmount);
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




// amount field contains the amount of stock units that stock has 
// and is used later when checking out to update the stock, note
// this will not work if the database is updated outside from the kalzate application
// unless the client is refreshed/synced
function addStockToTicket(state, action) {
  const existingOperation = state.operations.find(({ operation, reference }) =>
    reference === action.reference && operation === action.operation);

  if (existingOperation) {
    const operations = state.operations.map((operation) =>
      operation.reference === action.reference && operation.operation === action.operation ?
        { ...operation, amount: operation.amount + 1 } : operation
    );
    return { ...state, operations };
  }

  return { ...state, operations: [action, ...state.operations] };
}

function updateTicketOperation(state, action) {

  const operations = state.operations.map((operation) =>
    operation.reference === action.reference ?
      { ...operation, ...action } : operation
  );

  return { ...state, operations };

}

function removeStockFromTicket(state, action) {
  return {
    ...state,
    operations: [
      ...state.operations.slice(0, action.operationIndexPosition),
      ...state.operations.slice(action.operationIndexPosition + 1),
    ],
  };
}

function updateTicketPayment(state, action) {

  const payment = state.payments.find(({ method }) => method === action.method);

  if (payment) {
    const payments = state.payments.map(
      payment => payment.method === action.method ? ({ ...payment, ...action }) : payment);
    return { ...state, payments };
  }

  return {
    ...state,
    payments: [...state.payments, action]
  };
}






function returnStockFromTicket(state, action) {
  const items = state.items.map((item) =>
    item.reference === action.item.reference
      ? {
        ...item,
        amount_return: action.value,
        toReturn: true,
      }
      : item
  );
  return {
    ...state,
    items,
  };
}

function returnAllStockFromTicket(state) {
  const items = state.items.map((item) =>
    !item.toReturn && !item.added ? { ...item, amount_return: item.amount, toReturn: true } : item
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

function isReadOnly(ticket) {
  return (
    (ticket.next && ticket.created_at && Number(ticket.next) !== Number(ticket.created_at)) ||
    ticket.items.every(({ amount, amount_return_prev }) => amount === amount_return_prev)
  );
}

function loadTicket(state, action) {
  const ticket = action.ticket.toJSON();
  console.log('ticket', ticket);
  return isReadOnly(ticket) ? ticket : updateTicketTotal(ticket);
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
    case ADD_STOCK_TO_TICKET_ACTION:
      return addStockToTicket(state, action.data);
    case UPDATE_TICKET_OPERATION_ACTION:
      return updateTicketOperation(state, action.data);
    case REMOVE_STOCK_FROM_TICKET_ACTION:
      return removeStockFromTicket(state, action.data);
    case UPDATE_TICKET_PAYMENT_ACTION:
      return updateTicketPayment(state, action.data);



    case UPDATE_TICKET_SUCCESS_ACTION:
      return updateTicketTotal(state, action);
    case UPDATE_STOCK_TICKET_DATA_ACTION:
      return updateTicketData(state, action);
    case UPDATE_TICKET_TAX_ACTION:
      return updateTicketTax(state, action);
    case UPDATE_TICKET_DISCOUNT_ACTION:
      return updateTicketDiscount(state, action);
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
