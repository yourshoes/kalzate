import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'ui/db';
// import * as Constants from 'ui/constants';
import {
  REFRESH_STOCK_ACTION,
  REFRESH_STOCK_ERROR_ACTION,
  REFRESH_STOCK_SUCCESS_ACTION,
} from 'ui/containers/StockItems/constants';

function* refreshStock(action) {
  try {
    const { limit, skip } = action;
    const stock = yield call((...args) => Stock().init(...args), limit, skip);
    yield put({ type: REFRESH_STOCK_SUCCESS_ACTION, stock });
  } catch (e) {
    yield put({ type: REFRESH_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(REFRESH_STOCK_ACTION, refreshStock);
