import { all } from 'redux-saga/effects';
import settingsSaga from './settings';
import { downloadFileSaga } from './app';
import { updateTicketSaga, closeTicketSaga } from './tickets';
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
    updateTicketSaga,
    closeTicketSaga,
    stockCreateSaga,
    stockUpdateSaga,
    stockRefreshSaga,
    stockRemoveSaga,
    stockExportSaga,
    stockSearchSaga,
    stockMatchesSaga,
  ]);
}