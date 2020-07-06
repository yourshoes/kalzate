import { all } from 'redux-saga/effects';
import settingsSaga from './settings';
import { downloadFileSaga } from './app';
import { updateTicketSaga, closeTicketSaga, loadTicketSaga, matchesTicketSaga, printTicketSaga, searchTicketsSaga, voucherTicketsSaga, summaryTicketsSaga } from './tickets';
import {
  stockCreateSaga,
  stockUpdateSaga,
  stockRefreshSaga,
  stockRemoveSaga,
  stockExportSaga,
  stockSearchSaga,
  stockMatchesSaga,
} from './stock';
import { loadChartDataSaga } from './charts';

export default function* () {
  yield all([
    downloadFileSaga,
    settingsSaga,
    updateTicketSaga,
    closeTicketSaga,
    loadTicketSaga,
    matchesTicketSaga,
    printTicketSaga,
    searchTicketsSaga,
    voucherTicketsSaga,
    summaryTicketsSaga,
    stockCreateSaga,
    stockUpdateSaga,
    stockRefreshSaga,
    stockRemoveSaga,
    stockExportSaga,
    stockSearchSaga,
    stockMatchesSaga,
    loadChartDataSaga,
  ]);
}
