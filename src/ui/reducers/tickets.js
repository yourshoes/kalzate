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
} from 'ui/containers/TicketItems/constants';

// The initial state of the App
const initialState = { total: 0, items: [] };

function addTicketToState(state, action) {
  state.items.push(action.ticket);
  return { ...state, total: state.items.length };
}

function appReducer(state = initialState, action) {
  switch (action.type) {

    case CLOSE_TICKET_SUCCESS_ACTION:
      return addTicketToState(state, action);
    default:
      return state;
  }
}

export default appReducer;
