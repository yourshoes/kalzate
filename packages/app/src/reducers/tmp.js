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

import { omit, merge } from 'lodash';
import {
  UPDATE_TMP_STOCK_DATA_ACTION,
  UPDATE_STOCK_SUCCESS_ACTION,
  UPDATE_STOCK_MODAL_OPTION_ACTION,
  SEARCH_STOCK_SUCCESS_ACTION,
  GET_MATCHES_STOCK_SUCCESS_ACTION,
} from 'containers/StockItems/constants';
import {
  UPDATE_TMP_TICKET_DATA_ACTION,
  UPDATE_STOCK_TICKET_DATA_ACTION,
  GET_MATCHES_TICKETS_SUCCESS_ACTION,
} from 'containers/TicketItems/constants';
import { TOGGLE_TICKET_TOTAL_VISIBILITY, TOGGLE_RAW_TICKET_VISIBILITY } from 'containers/TicketTotalContainer/constants';
import { TOGGLE_TICKET_PAYMENTS_VISIBILITY } from 'containers/TicketPaymentsContainer/constants';

// The initial state of the App
const initialState = {
  stock: {},
  ticket: {},
  search: {
    stock: {},
    ticket: {},
    menu: {},
  },
  matches: {
    stock: { reference: [] },
    tickets: { created_at: [] },
  },
  modal: { removeStock: false, archiveStock: false },
  visibility: { tickets: { payments: true, total: true, raw: false } },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    // case CREATE_STOCK_SUCCESS_ACTION:
    //   return state.update('items', (items) => items.push(action.stock));
    case UPDATE_STOCK_TICKET_DATA_ACTION:
      return {
        ...state,
        ticket: merge({}, state.ticket, { [action.item.reference]: { amount: null, discount: null } }),
      };
    case UPDATE_TMP_TICKET_DATA_ACTION:
      return {
        ...state,
        ticket: merge({}, state.ticket, { [action.reference]: action.data }),
      };
    case UPDATE_TMP_STOCK_DATA_ACTION:
      return {
        ...state,
        stock: merge({}, state.stock, { [action.reference]: action.data }),
      };

    case UPDATE_STOCK_SUCCESS_ACTION:
      return {
        ...state,
        stock: omit(state.stock, action.stock.reference),
      };
    case SEARCH_STOCK_SUCCESS_ACTION:
      return { ...state, search: { ...state.search, stock: action.search || {} } };
    case GET_MATCHES_STOCK_SUCCESS_ACTION:
      return { ...state, matches: { ...state.matches, stock: { ...state.matches.stock, [action.field]: action.items || [] } } };
    case GET_MATCHES_TICKETS_SUCCESS_ACTION:
      return { ...state, matches: { ...state.matches, tickets: { ...state.matches.tickets, [action.field]: action.items || [] } } };
    case UPDATE_STOCK_MODAL_OPTION_ACTION:
      return { ...state, modal: { ...state.modal, [action.option]: action.value } };
    case TOGGLE_RAW_TICKET_VISIBILITY:
      return { ...state, visibility: { ...state.visibility, tickets: { ...state.visibility.tickets, raw: !state.visibility.tickets.raw } } };
    case TOGGLE_TICKET_TOTAL_VISIBILITY:
      return { ...state, visibility: { ...state.visibility, tickets: { ...state.visibility.tickets, total: !state.visibility.tickets.total } } };
    case TOGGLE_TICKET_PAYMENTS_VISIBILITY:
      return { ...state, visibility: { ...state.visibility, tickets: { ...state.visibility.tickets, payments: !state.visibility.tickets.payments } } };
    default:
      return state;
  }
}

export default appReducer;
