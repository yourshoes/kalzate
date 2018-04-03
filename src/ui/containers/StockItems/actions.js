/*
 *
 * StockItems actions
 *
 */

import {
  UPDATE_STOCK_ACTION,
  REFRESH_STOCK_ACTION,
  REMOVE_STOCK_ACTION,
} from './constants';

export function updateStock(stock) {
  return {
    type: UPDATE_STOCK_ACTION,
    stock,
  };
}

export function refreshStock(limit, skip) {
  return {
    type: REFRESH_STOCK_ACTION,
    limit,
    skip,
  };
}

export function removeStock(reference) {
  return {
    type: REMOVE_STOCK_ACTION,
    reference,
  };
}
