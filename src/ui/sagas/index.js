import { all } from 'redux-saga/effects';
import settingsSaga from './settings';

export default function* () {
  yield all([settingsSaga]);
}
