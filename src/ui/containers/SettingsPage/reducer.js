/*
 *
 * WorkSpacePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_SETTING_SUCCESS_ACTION,
  UPDATE_SETTING_ERROR_ACTION,
} from './constants';

const initialState = fromJS(undefined);

function settingPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTING_SUCCESS_ACTION:
      console.log('SUCCESS', action);
      return state;
    case UPDATE_SETTING_ERROR_ACTION:
      console.log('ERROR', action.error);
      return state;
    default:
      return state;
  }
}

export default settingPageReducer;
