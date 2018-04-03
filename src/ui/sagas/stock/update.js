import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'ui/db';
// import * as Constants from 'ui/constants';
import {
  UPDATE_STOCK_ACTION,
  UPDATE_STOCK_ERROR_ACTION,
  UPDATE_STOCK_SUCCESS_ACTION,
  REFRESH_STOCK_SUCCESS_ACTION,
} from 'ui/containers/StockItems/constants';
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'constants';

function* updateStock(action) {
  try {
    const { stock: stockItem } = action;
    stockItem.created_at = (new Date()).getTime();
    yield call((...args) => Stock().upsert(...args), stockItem);
    yield put({ type: UPDATE_STOCK_SUCCESS_ACTION, stock: stockItem });
    const stockUpdated = yield call((...args) => Stock().init(...args), DEFAULT_STOCK_ITEMS_LIMIT, 0);
    yield put({ type: REFRESH_STOCK_SUCCESS_ACTION, stock: stockUpdated });
  } catch (e) {
    yield put({ type: UPDATE_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(UPDATE_STOCK_ACTION, updateStock);
