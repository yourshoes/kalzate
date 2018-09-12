/*
 *
 * WorkSpacePage actions
 *
 */

import { SET_TICKET_GIVEN_AMOUNT_ACTION, DECREASE_TICKET_GIVEN_AMOUNT_ACTION, INCREASE_TICKET_GIVEN_AMOUNT_ACTION } from './constants';

export function setTicketGivenAmount(amount) {
  return {
    type: SET_TICKET_GIVEN_AMOUNT_ACTION,
    amount,
  };
}

export function decreaseGivenAmount(by) {
  return {
    type: DECREASE_TICKET_GIVEN_AMOUNT_ACTION,
    by,
  };
}

export function increaseGivenAmount(by) {
  return {
    type: INCREASE_TICKET_GIVEN_AMOUNT_ACTION,
    by,
  };
}
