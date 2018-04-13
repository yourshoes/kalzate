/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'ui/containers/App/reducer';
import settingsReducer from 'ui/reducers/settings';
import ticketsReducer from 'ui/reducers/tickets';
import ticketReducer from 'ui/reducers/ticket';
import stockReducer from 'ui/reducers/stock';
import languageProviderReducer from 'ui/containers/LanguageProvider/reducer';
import tmpReducer from 'ui/reducers/tmp';
import themeProviderReducer from 'ui/containers/ThemeProvider/reducer';
import ticketItemsReducer from 'ui/containers/TicketItems/reducer';
import ticketTotalReducer from 'ui/containers/TicketTotalContainer/reducer';
import ticketPaymentsReducer from 'ui/containers/TicketPaymentsContainer/reducer';
import stockItemsReducer from 'ui/containers/StockItems/reducer';
import cashDrawerReducer from 'ui/containers/CashDrawer/reducer';

import { databaseAsyncReducer } from './db';
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return databaseAsyncReducer(combineReducers({
    settings: settingsReducer,
    tickets: ticketsReducer,
    ticket: ticketReducer,
    stock: stockReducer,
    theme: themeProviderReducer,
    route: routeReducer,
    language: languageProviderReducer,
    tmp: tmpReducer,

    global: globalReducer,
    cashDrawer: cashDrawerReducer,
    ticketItems: ticketItemsReducer,
    ticketTotal: ticketTotalReducer,
    ticketPayments: ticketPaymentsReducer,
    stockItems: stockItemsReducer,
    ...asyncReducers,
  }));
}
