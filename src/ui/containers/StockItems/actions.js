/*
 *
 * StockItems actions
 *
 */

import {
  CREATE_STOCK_ACTION,
  UPDATE_STOCK_ACTION,
  REFRESH_STOCK_ACTION,
  REMOVE_STOCK_ACTION,
  EXPORT_STOCK_ACTION,
  SEARCH_STOCK_ACTION,
  GET_MATCHES_STOCK_ACTION,
  UPDATE_TMP_STOCK_DATA_ACTION,
  UPDATE_STOCK_MODAL_OPTION_ACTION,
  ADD_STOCK_TO_TICKET_ACTION,
} from './constants';

export function createStock(stock, options = {}) {
  return {
    type: CREATE_STOCK_ACTION,
    stock,
    options,
  };
}

export function updateStock(stock) {
  return {
    type: UPDATE_STOCK_ACTION,
    stock,
  };
}

export function refreshStock(limit, skip, search) {
  return {
    type: REFRESH_STOCK_ACTION,
    limit,
    skip,
    search,
  };
}

export function removeStock(reference, limit, skip, search) {
  return {
    type: REMOVE_STOCK_ACTION,
    reference,
    limit,
    skip,
    search,
  };
}

export function exportStock(decrypt) {
  return {
    type: EXPORT_STOCK_ACTION,
    decrypt,
  };
}

export function searchStock(search, limit, skip) {
  return {
    type: SEARCH_STOCK_ACTION,
    limit,
    skip,
    search,
  };
}

export function getMatches(field, value) {
  return {
    type: GET_MATCHES_STOCK_ACTION,
    field,
    value,
  };
}

export function updateTmpData(reference, data) {
  return {
    type: UPDATE_TMP_STOCK_DATA_ACTION,
    reference,
    data,
  };
}

export function updateModalOption(option, value) {
  return {
    type: UPDATE_STOCK_MODAL_OPTION_ACTION,
    option,
    value,
  };
}

export function addStockToTicket(item) {
  return {
    type: ADD_STOCK_TO_TICKET_ACTION,
    item,
  };
}
