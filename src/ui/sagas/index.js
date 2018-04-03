import { all } from 'redux-saga/effects';
import settingsSaga from './settings';
import { stockUpdateSaga, stockRefreshSaga, stockRemoveSaga } from './stock';

export default function* () {
  yield all([settingsSaga, stockUpdateSaga, stockRefreshSaga, stockRemoveSaga]);
}
