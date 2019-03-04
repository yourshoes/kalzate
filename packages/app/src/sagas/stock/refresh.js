import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'db';
// import * as Constants from 'config';
import {
  REFRESH_STOCK_ACTION,
  REFRESH_STOCK_ERROR_ACTION,
  REFRESH_STOCK_SUCCESS_ACTION,
} from 'containers/StockItems/constants';
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'config';

function* refreshStock(action) {
  try {
    const { limit, skip, search: match } = action;
    const stock = yield call((...args) => Stock().get(...args), {
      limit: limit || DEFAULT_STOCK_ITEMS_LIMIT,
      skip,
      match,
    });
    yield put({ type: REFRESH_STOCK_SUCCESS_ACTION, stock });
  } catch (e) {
    yield put({ type: REFRESH_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(REFRESH_STOCK_ACTION, refreshStock);
