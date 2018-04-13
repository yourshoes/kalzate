import { all } from 'redux-saga/effects';
import settingsSaga from './settings';
import {
  stockCreateSaga,
  stockUpdateSaga,
  stockRefreshSaga,
  stockRemoveSaga,
  stockSearchSaga,
} from './stock';

export default function* () {
  yield all([
    settingsSaga,
    stockCreateSaga,
    stockUpdateSaga,
    stockRefreshSaga,
    stockRemoveSaga,
    stockSearchSaga,
  ]);
}
