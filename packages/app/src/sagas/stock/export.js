import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock } from 'db';
// import * as Constants from 'config';
import { EXPORT_STOCK_ACTION, EXPORT_STOCK_ERROR_ACTION } from 'containers/StockItems/constants';
import { DOWNLOAD_FILE_ACTION } from 'containers/App/constants';

function* exportStock(action) {
  try {
    const { decrypt } = action;
    const stock = yield call((...args) => Stock().dump(...args), decrypt);
    yield put({
      type: DOWNLOAD_FILE_ACTION,
      content: JSON.stringify(stock.docs),
      fileName: `stock_${new Date().toLocaleDateString().replace(/\//g, '_')}.json`,
    });
  } catch (e) {
    yield put({ type: EXPORT_STOCK_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(EXPORT_STOCK_ACTION, exportStock);
