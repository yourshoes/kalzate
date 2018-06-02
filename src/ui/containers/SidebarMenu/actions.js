import {
  LOAD_TICKET_ACTION,
} from 'ui/containers/TicketItems/constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function loadTicket(ticket) {
  return {
    type: LOAD_TICKET_ACTION,
    ticket,
  };
}
