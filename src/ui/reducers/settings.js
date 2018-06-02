/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  UPDATE_SETTING_SUCCESS_ACTION,
  UPDATE_SETTING_ERROR_ACTION,
} from 'ui/containers/SettingsPage/constants';

// The initial state of the App
const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTING_SUCCESS_ACTION:
      console.log('SUCCESS', action);
      return state;
    case UPDATE_SETTING_ERROR_ACTION:
      console.log('ERROR', action.message);
      return state;
    default:
      return state;
  }
}
