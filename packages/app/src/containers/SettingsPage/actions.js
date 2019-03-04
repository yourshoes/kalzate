/*
 *
 * WorkSpacePage actions
 *
 */

import {
  UPDATE_SETTING_ACTION,
} from './constants';

export function updateSetting(key, value) {
  return {
    type: UPDATE_SETTING_ACTION,
    key,
    value,
  };
}
