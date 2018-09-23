/*
 *
 * LanguageProvider reducer
 *
 */

import { LOCATION_CHANGE } from 'react-router-redux';
import { STATE_LOADING_START, STATE_LOADING_DONE, STATE_LOADING_FAILED } from 'ui/constants';
// Initial routing state
const routeInitialState = {
  locationBeforeTransitions: null,
  loading: STATE_LOADING_START,
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return {
        ...state,
        locationBeforeTransitions: action.payload,
      };
    case STATE_LOADING_DONE:
      return {
        ...state,
        loading: STATE_LOADING_DONE,
      };
    case STATE_LOADING_FAILED:
      return {
        ...state,
        loading: STATE_LOADING_FAILED,
      };
    default:
      return state;
  }
}

export default routeReducer;
