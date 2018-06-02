import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketTotal state domain
 */
const selectTicketPaymentsDomain = () => (state) => state.tmp.visibility.tickets;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketTotal
 */

const makeSelectTicketPaymentsVisibility = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.payments
  );

export { selectTicketPaymentsDomain, makeSelectTicketPaymentsVisibility };
