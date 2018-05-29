/*
 *
 * TicketItems actions
 *
 */

import {
  UPDATE_TMP_TICKET_DATA_ACTION,
  UPDATE_STOCK_TICKET_DATA_ACTION,
  REMOVE_STOCK_FROM_TICKET_ACTION,
  ADD_STOCK_TO_TICKET_ACTION,
  UPDATE_TICKET_ACTION,
  REMOVE_TICKET_ACTION,
  CLOSE_TICKET_ACTION,
} from './constants';

export function updateTmpData(reference, data) {
  return {
    type: UPDATE_TMP_TICKET_DATA_ACTION,
    reference,
    data,
  };
}

export function updateTicketData(item, data) {
  return {
    type: UPDATE_TICKET_ACTION,
    put: UPDATE_STOCK_TICKET_DATA_ACTION,
    item,
    data,
  };
}

export function removeStockFromTicket(item, positionInList) {
  return {
    type: UPDATE_TICKET_ACTION,
    put: REMOVE_STOCK_FROM_TICKET_ACTION,
    item,
    positionInList,
  };
}

export function removeTicket() {
  return {
    type: REMOVE_TICKET_ACTION,
  };
}

export function addStockToTicket(item) {
  return {
    type: UPDATE_TICKET_ACTION,
    put: ADD_STOCK_TO_TICKET_ACTION,
    item,
  };
}

export function closeTicket(ticket, state) {
  return {
    type: CLOSE_TICKET_ACTION,
    ticket,
    state,
  };
}
