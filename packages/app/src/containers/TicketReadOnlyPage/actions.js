/*
 *
 * TicketItems actions
 *
 */

import {
  UPDATE_TMP_TICKET_DATA_ACTION,
  UPDATE_STOCK_TICKET_DATA_ACTION,
  REMOVE_STOCK_FROM_TICKET_ACTION,
  RETURN_STOCK_FROM_TICKET_ACTION,
  UNDO_RETURN_STOCK_FROM_TICKET_ACTION,
  ADD_STOCK_TO_TICKET_ACTION,
  UPDATE_TICKET_ACTION,
  REMOVE_TICKET_ACTION,
  CLOSE_TICKET_ACTION,
  UPDATE_TICKET_TAX_ACTION,
  UPDATE_TICKET_DISCOUNT_ACTION,
  GET_MATCHES_TICKETS_ACTION,
  LOAD_TICKET_ACTION,
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

export function updateTicketTax(tax) {
  return {
    type: UPDATE_TICKET_ACTION,
    put: UPDATE_TICKET_TAX_ACTION,
    tax,
  };
}

export function updateTicketDiscount(discount) {
  return {
    type: UPDATE_TICKET_ACTION,
    put: UPDATE_TICKET_DISCOUNT_ACTION,
    discount,
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
export function returnStockFromTicket(item, positionInList) {
  return {
    type: UPDATE_TICKET_ACTION,
    put: RETURN_STOCK_FROM_TICKET_ACTION,
    item,
    positionInList,
  };
}

export function undoReturnStockFromTicket(item, positionInList) {
  return {
    type: UPDATE_TICKET_ACTION,
    put: UNDO_RETURN_STOCK_FROM_TICKET_ACTION,
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

export function closeTicket(ticket, options = {}) {
  return {
    type: CLOSE_TICKET_ACTION,
    ticket,
    options,
  };
}

export function getMatches(field, value) {
  return {
    type: GET_MATCHES_TICKETS_ACTION,
    field,
    value,
  };
}

export function loadTicket(ticket, options = {}) {
  return {
    type: LOAD_TICKET_ACTION,
    ticket,
    options,
  };
}

