/*
 *
 * LanguageProvider reducer
 *
 */


import {
  CHANGE_LOCALE,
} from 'containers/LanguageProvider/constants';
import {
  DEFAULT_LOCALE,
} from 'containers/App/constants'; // eslint-disable-line
import { appLocalesMessages } from 'i18n';

const initialState = {
  locale: DEFAULT_LOCALE,
};

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE: {
      const locale = action.locale;
      if (locale && appLocalesMessages[locale]) {
        return { locale };
      }
      return state;
    }
    default:
      return state;
  }
}

export default languageProviderReducer;
