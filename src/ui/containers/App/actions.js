/*
 *
 * WorkSpacePage actions
 *
 */

import { CHANGE_TAKE_AMOUNT } from './constants';

export function setTicketTakeAmount(amount) {
  return {
    type: CHANGE_TAKE_AMOUNT,
    amount,
  };
}
