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
// import { remove } from 'lodash';
import {
  // CREATE_STOCK_SUCCESS_ACTION,
  // CREATE_STOCK_ERROR_ACTION,
  REFRESH_STOCK_SUCCESS_ACTION,
  UPDATE_STOCK_SUCCESS_ACTION,
  // REMOVE_STOCK_SUCCESS_ACTION,
  // REFRESH_STOCK_ERROR_ACTION,
} from 'ui/containers/StockItems/constants';

// The initial state of the App
const initialState = fromJS({
  items: [],
  total: 0,
  limit: DEFAULT_STOCK_ITEMS_LIMIT,
  skip: 0,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STOCK_SUCCESS_ACTION:
      return state.update('items', (stockItems) =>
        stockItems.map(
          (stockItem) =>
            stockItem.reference === action.stock.reference
              ? action.stock
              : stockItem
        )
      );
    // case REMOVE_STOCK_SUCCESS_ACTION:
    //   return state
    //     .update('items', (stockItems) =>
    //       stockItems.filter((item) => item.reference !== action.stock.reference)
    //     )
    //     .update('total', (total) => total - 1);
    // case CREATE_STOCK_SUCCESS_ACTION:
    //   return state.update('items', (items) => items.push(action.stock));
    case REFRESH_STOCK_SUCCESS_ACTION:
      return fromJS(action.stock);
    default:
      return state;
  }
}

export default appReducer;
