import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'ui/db';
// import * as Constants from 'ui/constants';
import {
  REMOVE_STOCK_ACTION,
  REMOVE_STOCK_ERROR_ACTION,
  REMOVE_STOCK_SUCCESS_ACTION,
  REFRESH_STOCK_SUCCESS_ACTION,
} from 'ui/containers/StockItems/constants';
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'constants';

function* removeStock(action) {
  try {
    const { reference } = action;
    const stock = yield call((...args) => Stock().remove(...args), reference);
    yield put({ type: REMOVE_STOCK_SUCCESS_ACTION, stock });
    const stockUpdated = yield call((...args) => Stock().init(...args), DEFAULT_STOCK_ITEMS_LIMIT, 0);
    yield put({ type: REFRESH_STOCK_SUCCESS_ACTION, stock: stockUpdated });
  } catch (e) {
    yield put({ type: REMOVE_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(REMOVE_STOCK_ACTION, removeStock);
