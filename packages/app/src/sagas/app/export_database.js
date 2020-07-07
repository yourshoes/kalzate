import { takeEvery, put, call } from 'redux-saga/effects';
import { Stock, Tickets } from 'db';
// import * as Constants from 'config';
import { DOWNLOAD_FILE_ACTION } from 'containers/App/constants';
// import * as Constants from 'config';
import { EXPORT_DATABASE_ACTION } from 'actions/app/types';

function* exportDatabase() {
  try {
    const stock = yield call(() => Stock().dump());
    const tickets = yield call(() => Tickets().dump());
    yield put({
      type: DOWNLOAD_FILE_ACTION,
      content: JSON.stringify({ stock: stock.docs, tickets: tickets.docs }),
      fileName: `database_backup_${new Date().toLocaleDateString().replace(/\//g, '_')}.json`,
    });
  } catch (e) {
  }
}

export default takeEvery(EXPORT_DATABASE_ACTION, exportDatabase);
