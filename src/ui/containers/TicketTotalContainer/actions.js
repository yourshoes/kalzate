/*
 *
 * TicketTotal actions
 *
 */

import { TOGGLE_TICKET_TOTAL_VISIBILITY, TOGGLE_RAW_TICKET_VISIBILITY } from './constants';

export function toggleTicketTotalVisibility() {
  return {
    type: TOGGLE_TICKET_TOTAL_VISIBILITY,
  };
}

export function toggleRawTicketVisibility() {
  return {
    type: TOGGLE_RAW_TICKET_VISIBILITY,
  };
}
