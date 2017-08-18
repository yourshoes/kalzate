import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectTheme = (state) => state.get('theme');

/**
 * Select the language locale
 */

const makeSelectTheme = () => createSelector(
  selectTheme,
  (themeState) => themeState.get('theme')
);

export {
  selectTheme,
  makeSelectTheme,
};
