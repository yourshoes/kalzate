/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import settingsReducer from 'ui/reducers/settings';
import routeReducer from 'ui/reducers/router';
import ticketsReducer from 'ui/reducers/tickets';
import ticketReducer from 'ui/reducers/ticket';
import stockReducer from 'ui/reducers/stock';
import tmpReducer from 'ui/reducers/tmp';
import languageProviderReducer from 'ui/reducers/language';
import themeProviderReducer from 'ui/reducers/theme';

import { databaseAsyncReducer } from './db';
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

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

    ...asyncReducers,
  }));
}
