/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const CHANGE_TOTAL_AMOUNT = 'kalzate/App/CHANGE_TOTAL_AMOUNT';
export const CHANGE_TAKE_AMOUNT = 'kalzate/App/CHANGE_TAKE_AMOUNT';
export const CHANGE_RESOURCE_SELECTED = 'octoql/App/CHANGE_RESOURCE_SELECTED';
export const ADD_RESOURCE = 'octoql/App/ADD_RESOURCE';

export const DOWNLOAD_FILE_ACTION = 'kalzate/App/DOWNLOAD_FILE_ACTION';
export const DOWNLOAD_FILE_ERROR_ACTION =
  'kalzate/App/DOWNLOAD_FILE_ERROR_ACTION';
