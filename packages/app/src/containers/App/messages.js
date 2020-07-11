/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  createTicket: {
    id: 'kz.containers.App.actions.createTicket',
    defaultMessage: 'Create Ticket',
  },
  changeLang: {
    id: 'kz.containers.App.actions.changeLang',
    defaultMessage: 'Change Language',
  },
  changeTheme: {
    id: 'kz.containers.App.actions.changeTheme',
    defaultMessage: 'Change Theme',
  },
  importStock: {
    id: 'kz.containers.App.actions.importStock',
    defaultMessage: 'Import Stock',
  },
  exportDatabase: {
    id: 'kz.containers.App.actions.exportDatabase',
    defaultMessage: 'Export Databse',
  },
  resetDB: {
    id: 'kz.containers.App.actions.resetDB',
    defaultMessage: 'Reset Database',
  },
  englishLang: {
    id: 'kz.containers.LanguageProvider.en',
    defaultMessage: 'English',
  },
  spanishLang: {
    id: 'kz.containers.LanguageProvider.es',
    defaultMessage: 'Spanish',
  },
});
