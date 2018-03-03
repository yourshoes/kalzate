import { takeEvery, put, call } from 'redux-saga/effects';
import { Settings } from 'ui/db';
import {
  UPDATE_SETTING_ACTION,
  UPDATE_SETTING_ERROR_ACTION,
  UPDATE_SETTING_SUCCESS_ACTION,
} from 'ui/containers/SettingsPage/constants';

function* updateSetting(action) {
  try {
    const { key, value } = action;
    if (key === 'country') {
      yield call((setting) => Settings().upsert(setting), { key, value });
      yield put({ type: UPDATE_SETTING_SUCCESS_ACTION, key, value });
    }
  } catch (e) {
    yield put({ type: UPDATE_SETTING_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(UPDATE_SETTING_ACTION, updateSetting);
