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
  LOAD_CHART_DATA_SUCCESS_ACTION,
} from 'ui/containers/DiscoverPage/constants';

// The initial state of the App
const initialState = { salesChart: [], ticketsChart: [], stockChart: [], alertChart: [] };

function updateChartReducer(state, action) {

  return {
    ...state,
    [action.chart]: action.data,
  };
}

function chartsReducer(state = initialState, action) {
  switch (action.type) {

    case LOAD_CHART_DATA_SUCCESS_ACTION:
      return updateChartReducer(state, action);
    default:
      return state;
  }
}

export default chartsReducer;
