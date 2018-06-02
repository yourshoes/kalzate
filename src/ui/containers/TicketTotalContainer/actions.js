/*
 *
 * TicketTotal actions
 *
 */

import { TOGGLE_TICKET_TOTAL_VISIBILITY } from './constants';

export function toggleTicketTotalVisibility() {
  return {
    type: TOGGLE_TICKET_TOTAL_VISIBILITY,
  };
}
