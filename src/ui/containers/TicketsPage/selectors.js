import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketTotal state domain
 */
const selectTicketVisibility = () => (state) => state.tmp.visibility.tickets;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketTotal
 */

const makeSelectTicketTotalVisibility = () =>
  createSelector(selectTicketVisibility(), (substate) =>
    substate.total
  );
const makeSelectTicketPaymentsVisibility = () =>
  createSelector(selectTicketVisibility(), (substate) =>
    substate.payments
  );

export { makeSelectTicketTotalVisibility, makeSelectTicketPaymentsVisibility };
