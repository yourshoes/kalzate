import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectTheme = (state) => state.theme;

/**
 * Select the language locale
 */

const makeSelectTheme = () =>
  createSelector(selectTheme, (themeState) => themeState.theme);

const makeSelectThemeName = () =>
  createSelector(selectTheme, (themeState) => themeState.name);

export { selectTheme, makeSelectTheme, makeSelectThemeName };
