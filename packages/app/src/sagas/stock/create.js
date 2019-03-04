import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'db';
// import * as Constants from 'config';
import {
  CREATE_STOCK_ACTION,
  CREATE_STOCK_ERROR_ACTION,
  START_STOCK_CHANGE_ACTION,
  // CREATE_STOCK_SUCCESS_ACTION,
  REFRESH_STOCK_ACTION,
} from 'containers/StockItems/constants';
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'config';

function* createStock(action) {
  try {
    const { stock: stockItem, options } = action;
    yield put({ type: START_STOCK_CHANGE_ACTION });
    yield call((...args) => Stock().create(...args), stockItem, options);
    // yield put({ type: CREATE_STOCK_SUCCESS_ACTION, stock: stockItem });
    // @todo print notification if batch mode
    yield put({
      type: REFRESH_STOCK_ACTION,
      limit: DEFAULT_STOCK_ITEMS_LIMIT,
      skip: 0,
    });
  } catch (e) {
    console.error(e);
    // @todo print notification if batch mode
    yield put({ type: CREATE_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(CREATE_STOCK_ACTION, createStock);
