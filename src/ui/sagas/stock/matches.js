import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'ui/db';
import {
  GET_MATCHES_STOCK_ACTION,
  GET_MATCHES_STOCK_ERROR_ACTION,
  GET_MATCHES_STOCK_SUCCESS_ACTION,
} from 'ui/containers/StockItems/constants';

function* matchesStock(action) {
  try {
    const { field, value } = action;
    const { items } = yield call(
      (...args) => Stock().matches(...args),
      field,
      value
    );
    yield put({
      type: GET_MATCHES_STOCK_SUCCESS_ACTION,
      field,
      items,
    });
  } catch (e) {
    yield put({ type: GET_MATCHES_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(GET_MATCHES_STOCK_ACTION, matchesStock);
