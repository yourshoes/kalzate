import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketTotal state domain
 */
const selectTicketTotalDomain = () => (state) => state.get('ticketTotal');
const selectTicketPaymentsDomain = () => (state) => state.get('ticketPayments');

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketTotal
 */

const makeSelectTicketTotalVisibility = () =>
  createSelector(selectTicketTotalDomain(), (ticketTotalState) =>
    ticketTotalState.getIn(['visible'])
  );
const makeSelectTicketPaymentsVisibility = () =>
  createSelector(selectTicketPaymentsDomain(), (ticketTotalState) =>
    ticketTotalState.getIn(['visible'])
  );

export { makeSelectTicketTotalVisibility, makeSelectTicketPaymentsVisibility };