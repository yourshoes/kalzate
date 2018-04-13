import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'ui/db';
// import * as Constants from 'ui/constants';
import {
  CREATE_STOCK_ACTION,
  CREATE_STOCK_ERROR_ACTION,
  // CREATE_STOCK_SUCCESS_ACTION,
  REFRESH_STOCK_ACTION,
} from 'ui/containers/StockItems/constants';
import { DEFAULT_STOCK_ITEMS_LIMIT } from 'constants';

function* createStock(action) {
  try {
    const { stock: stockItem } = action;
    yield call((...args) => Stock().create(...args), stockItem);
    // yield put({ type: CREATE_STOCK_SUCCESS_ACTION, stock: stockItem });
    yield put({
      type: REFRESH_STOCK_ACTION,
      limit: DEFAULT_STOCK_ITEMS_LIMIT,
      skip: 0,
    });
  } catch (e) {
    yield put({ type: CREATE_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(CREATE_STOCK_ACTION, createStock);
