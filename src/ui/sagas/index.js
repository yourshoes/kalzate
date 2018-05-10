import { all } from 'redux-saga/effects';
import settingsSaga from './settings';
import { downloadFileSaga } from './app';
// import { addItemToTicketSaga } from './tickets';
import {
  stockCreateSaga,
  stockUpdateSaga,
  stockRefreshSaga,
  stockRemoveSaga,
  stockExportSaga,
  stockSearchSaga,
  stockMatchesSaga,
} from './stock';

export default function* () {
  yield all([
    downloadFileSaga,
    settingsSaga,
    // addItemToTicketSaga,
    stockCreateSaga,
    stockUpdateSaga,
    stockRefreshSaga,
    stockRemoveSaga,
    stockExportSaga,
    stockSearchSaga,
    stockMatchesSaga,
  ]);
}
