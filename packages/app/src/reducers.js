/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import settingsReducer from 'reducers/settings';
import routeReducer from 'reducers/router';
import ticketsReducer from 'reducers/tickets';
import ticketReducer from 'reducers/ticket';
import stockReducer from 'reducers/stock';
import tmpReducer from 'reducers/tmp';
import chartsReducer from 'reducers/charts';
import languageProviderReducer from 'reducers/language';
import themeProviderReducer from 'reducers/theme';

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
    charts: chartsReducer,

    ...asyncReducers,
  }));
}
