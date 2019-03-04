import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTickets = () => (state) => state.tickets;
const selectTicket = () => (state) => state.ticket;


/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketPayments
 */

const makeSelectTicketItems = () =>
  createSelector(selectTickets(), (substate) =>
    substate.items);

const makeSelectTicketID = () =>
  createSelector(selectTicket(), (substate) =>
    substate.id);


export default selectTickets;
export {
  selectTickets,
  makeSelectTicketItems,
  makeSelectTicketID,
};
