import * as actionTypes from './types';

export const hydrate = () => ({
  type: actionTypes.HYDRATE_ACTION,
});

export const hydrateSuccess = (data = {}) => ({
  type: actionTypes.HYDRATE_SUCCESS_ACTION,
  data
});

export const exportDatabase = () => ({
  type: actionTypes.EXPORT_DATABASE_ACTION,
});