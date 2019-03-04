import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'db';
// import * as Constants from 'config';
import {
  UPDATE_STOCK_ACTION,
  UPDATE_STOCK_ERROR_ACTION,
  UPDATE_STOCK_SUCCESS_ACTION,
} from 'containers/StockItems/constants';

function* updateStock(action) {
  try {
    const { stock: stockItem } = action;
    stockItem.price = parseFloat(stockItem.price);
    const updatedStock = yield call(
      (...args) => Stock().update(...args),
      stockItem
    );
    yield put({ type: UPDATE_STOCK_SUCCESS_ACTION, stock: updatedStock });
    // const stockUpdated = yield call((...args) => Stock().init(...args), DEFAULT_STOCK_ITEMS_LIMIT, 0);
    // yield put({ type: REFRESH_STOCK_SUCCESS_ACTION, stock: stockUpdated });
  } catch (e) {
    yield put({ type: UPDATE_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(UPDATE_STOCK_ACTION, updateStock);
