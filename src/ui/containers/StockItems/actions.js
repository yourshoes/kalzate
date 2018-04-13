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
  SEARCH_STOCK_ACTION,
  UPDATE_TMP_STOCK_DATA_ACTION,
} from './constants';

export function createStock(stock) {
  return {
    type: CREATE_STOCK_ACTION,
    stock,
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

export function searchStock(search, limit, skip) {
  return {
    type: SEARCH_STOCK_ACTION,
    limit,
    skip,
    search,
  };
}

export function updateTmpData(reference, data) {
  return {
    type: UPDATE_TMP_STOCK_DATA_ACTION,
    reference,
    data,
  };
}
