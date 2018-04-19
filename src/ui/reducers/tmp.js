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
import { omit, merge } from 'lodash';
import {
  UPDATE_TMP_STOCK_DATA_ACTION,
  UPDATE_STOCK_SUCCESS_ACTION,
  UPDATE_STOCK_MODAL_OPTION_ACTION,
  SEARCH_STOCK_SUCCESS_ACTION,
} from 'ui/containers/StockItems/constants';

// The initial state of the App
const initialState = fromJS({
  stock: {},
  search: {
    stock: {},
    ticket: {},
    menu: {},
  },
  modal: { removeStock: false, archiveStock: false },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // case CREATE_STOCK_SUCCESS_ACTION:
    //   return state.update('items', (items) => items.push(action.stock));
    case UPDATE_TMP_STOCK_DATA_ACTION:
      return state.update('stock', (stock) =>
        merge({}, stock, { [action.reference]: action.data })
      );
    case UPDATE_STOCK_SUCCESS_ACTION:
      return state.update('stock', (stock) =>
        omit(stock, action.stock.reference)
      );
    case SEARCH_STOCK_SUCCESS_ACTION:
      return state.updateIn(['search', 'stock'], () => action.search || {});
    case UPDATE_STOCK_MODAL_OPTION_ACTION:
      return state.updateIn(['modal', action.option], () => action.value);
    default:
      return state;
  }
}

export default appReducer;
