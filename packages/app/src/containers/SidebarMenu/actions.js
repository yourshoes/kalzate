import { LOAD_TICKET_ACTION, SEARCH_TICKETS_ACTION } from 'containers/TicketSellingPage/constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function loadTicket(ticketId, options = {}) {
  return {
    type: LOAD_TICKET_ACTION,
    data: {
      ticketId,
      options
    },
  };
}

export function searchTickets(field, value, operator) {
  return {
    type: SEARCH_TICKETS_ACTION,
    field,
    value,
    operator,
  };
}
