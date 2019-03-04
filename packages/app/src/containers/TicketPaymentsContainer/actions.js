/*
 *
 * TicketTotal actions
 *
 */

import { TOGGLE_TICKET_PAYMENTS_VISIBILITY } from './constants';

export function toggleTicketPaymentsVisibility() {
  return {
    type: TOGGLE_TICKET_PAYMENTS_VISIBILITY,
  };
}
