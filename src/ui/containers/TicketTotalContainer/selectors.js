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

export default makeSelectTicketTotalVisibility;
export { selectTicketTotalDomain, makeSelectTicketTotalVisibility };
