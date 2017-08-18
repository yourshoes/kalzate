/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import { getQueryParams } from 'ui/utils/url';
import * as themes from './themes';
import { CHANGE_THEME } from './constants';

// Check 'theme' query param to use as default theme
const { theme } = getQueryParams(window.location.search);

const initialState = fromJS({
  // If no query param 'theme', fallback to light theme by default
  theme: theme && themes[theme] ? themes[theme] : themes.monokai,
});

function themeProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      // If not theme found, do nothing, just keep current theme
      if (themes[action.theme]) {
        return state.set('theme', fromJS(themes[action.theme]));
      }
      return state;
    default:
      return state;
  }
}

export default themeProviderReducer;
