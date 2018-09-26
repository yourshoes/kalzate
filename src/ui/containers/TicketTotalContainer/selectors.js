import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketTotal state domain
 */
const selectTicketTotalDomain = () => (state) => state.tmp.visibility.tickets;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketTotal
 */

const makeSelectTicketTotalVisibility = () =>
  createSelector(selectTicketTotalDomain(), (substate) =>
    substate.total
  );

const makeSelectRawTicketTotalVisibility = () =>
  createSelector(selectTicketTotalDomain(), (substate) =>
    substate.raw
  );

export default makeSelectTicketTotalVisibility;
export { selectTicketTotalDomain, makeSelectTicketTotalVisibility, makeSelectRawTicketTotalVisibility };
