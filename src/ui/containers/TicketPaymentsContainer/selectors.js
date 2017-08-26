import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketTotal state domain
 */
const selectTicketPaymentsDomain = () => (state) => state.get('ticketPayments');

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketTotal
 */

const makeSelectTicketPaymentsVisibility = () =>
  createSelector(selectTicketPaymentsDomain(), (ticketTotalState) =>
    ticketTotalState.getIn(['visible'])
  );

export { selectTicketPaymentsDomain, makeSelectTicketPaymentsVisibility };
