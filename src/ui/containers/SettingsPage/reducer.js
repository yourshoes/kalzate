/*
 *
 * WorkSpacePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SETTING_UPDATED_ACTION,
} from './constants';

const initialState = fromJS({

});

function settingPageReducer(state = initialState, action) {
  switch (action.type) {
    case SETTING_UPDATED_ACTION:
      return state;
    default:
      return state;
  }
}

export default settingPageReducer;
