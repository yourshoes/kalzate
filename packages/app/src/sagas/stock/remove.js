import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'db';
// import * as Constants from 'config';
import {
  REMOVE_STOCK_ACTION,
  REMOVE_STOCK_ERROR_ACTION,
  REMOVE_STOCK_SUCCESS_ACTION,
  REFRESH_STOCK_ACTION,
} from 'containers/StockItems/constants';
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'config';

function* removeStock(action) {
  try {
    const { reference, limit, skip, search } = action;
    const stock = yield call((...args) => Stock().remove(...args), reference);
    yield put({ type: REMOVE_STOCK_SUCCESS_ACTION, stock });
    yield put({
      type: REFRESH_STOCK_ACTION,
      limit: limit || DEFAULT_STOCK_ITEMS_LIMIT,
      skip: skip || 0,
      search,
    });
  } catch (e) {
    yield put({ type: REMOVE_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(REMOVE_STOCK_ACTION, removeStock);
