/*
 *
 * TicketPayments actions
 *
 */

import { SET_METHOD_TICKET_PAYMENTS_ACTION } from './constants';

export function setMethod(method) {
  return {
    type: SET_METHOD_TICKET_PAYMENTS_ACTION,
    method,
  };
}
