import { takeEvery, put, call } from 'redux-saga/effects';
// import { Stock } from 'ui/db';
// import * as Constants from 'ui/constants';
import {
  SEARCH_STOCK_ACTION,
  SEARCH_STOCK_ERROR_ACTION,
  SEARCH_STOCK_SUCCESS_ACTION,
  REFRESH_STOCK_ACTION,
} from 'ui/containers/StockItems/constants';
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'constants';

function* searchStock(action) {
  try {
    const { search, limit, skip } = action;
    yield put({
      type: REFRESH_STOCK_ACTION,
      limit: limit || DEFAULT_STOCK_ITEMS_LIMIT,
      skip: skip || 0,
      search,
    });
    yield put({
      type: SEARCH_STOCK_SUCCESS_ACTION,
      search,
    });
  } catch (e) {
    yield put({ type: SEARCH_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(SEARCH_STOCK_ACTION, searchStock);
