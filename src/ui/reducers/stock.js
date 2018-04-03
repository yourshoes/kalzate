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
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'ui/constants';
import {
  UPDATE_STOCK_SUCCESS_ACTION,
  UPDATE_STOCK_ERROR_ACTION,
  REFRESH_STOCK_SUCCESS_ACTION,
  REFRESH_STOCK_ERROR_ACTION,
} from 'ui/containers/StockItems/constants';

// The initial state of the App
const initialState = fromJS({ items: [], total: 0, limit: DEFAULT_STOCK_ITEMS_LIMIT, skip: 0 });

function appReducer(state = initialState, action) {
  switch (action.type) {
    // case UPDATE_STOCK_SUCCESS_ACTION:
    //   return state.update('items', (items) => items.push(action.stock));
    case REFRESH_STOCK_SUCCESS_ACTION:
      return fromJS(action.stock);
    default:
      return state;
  }
}

export default appReducer;
