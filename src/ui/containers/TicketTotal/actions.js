/*
 *
 * WorkSpacePage actions
 *
 */

import { SET_TICKET_GIVEN_AMOUNT_ACTION } from './constants';

export function setTicketGivenAmount(amount) {
  return {
    type: SET_TICKET_GIVEN_AMOUNT_ACTION,
    amount,
  };
}
