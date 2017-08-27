/*
 *
 * StockItems reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

const initialState = fromJS({
  items: [],
  count: 0,
  limit: 10,
  offset: 0,
});

function stockItemsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default stockItemsReducer;
