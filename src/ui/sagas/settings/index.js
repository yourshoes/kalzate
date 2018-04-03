import { takeEvery, put, call } from 'redux-saga/effects';
import { Settings } from 'ui/db';
import * as Constants from 'ui/constants';
import {
  UPDATE_SETTING_ACTION,
  UPDATE_SETTING_ERROR_ACTION,
  UPDATE_SETTING_SUCCESS_ACTION,
} from 'ui/containers/SettingsPage/constants';

function* updateSetting(action) {
  try {
    const { key, value } = action;
    switch (key) {
      case Constants.COUNTRY_SETTING:
      case Constants.LANG_SETTING:
      case Constants.THEME_SETTING:
      case Constants.TIMEZONE_SETTING:
      case Constants.NAME_SETTING:
      case Constants.ADDRESS_SETTING:
      case Constants.EMAIL_SETTING:
      case Constants.PHONE_SETTING:
      case Constants.PRINTER_NAME_SETTING:
      case Constants.PRINTER_IP_SETTING:
      case Constants.TICKET_TEMPLATE_SETTING:
      case Constants.BACKUP_FRECUENCY_SETTING:
      case Constants.BACKUP_LOCATION_SETTING:
      case Constants.ANALYTICS_SERVER_SETTING:
        yield call((setting) => Settings().collection.upsert(setting), { key, value });
        yield put({ type: UPDATE_SETTING_SUCCESS_ACTION, key, value });
        break;
      default:
        return;
    }
  } catch (e) {
    yield put({ type: UPDATE_SETTING_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(UPDATE_SETTING_ACTION, updateSetting);
