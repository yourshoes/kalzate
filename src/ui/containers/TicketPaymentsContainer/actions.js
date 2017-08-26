/*
 *
 * TicketTotal actions
 *
 */

import { TOGGLE_VISIBILITY } from './constants';

export function toggleTicketPaymentsVisibility() {
  return {
    type: TOGGLE_VISIBILITY,
  };
}
