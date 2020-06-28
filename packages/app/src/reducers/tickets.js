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

import {
  CLOSE_TICKET_SUCCESS_ACTION,
  SEARCH_TICKETS_SUCCESS_ACTION,
} from 'containers/TicketSellingPage/constants';

import {
  CREATE_TICKET_SUCCESS_ACTION
} from 'actions/tickets/types';

// The initial state of the App
const initialState = { total: 0, items: [] };

function addTicketToState(state, action) {
  const ticketItem = state.items.find(({ id }) => id === action.id);
  if (ticketItem) {
    return state;
  }
  return { ...state, items: state.items.concat([action]), total: state.total + 1 };
}

function searchTickets(state, action) {
  const { items, total } = action.tickets;
  return { ...state, items, total };
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS_ACTION:
      return addTicketToState(state, action.data);
    case SEARCH_TICKETS_SUCCESS_ACTION:
      return searchTickets(state, action);
    default:
      return state;
  }
}

export default appReducer;
