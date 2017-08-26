import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketTotal state domain
 */
const selectTicketTotalDomain = () => (state) => state.get('ticketTotal');

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

export default makeSelectTicketTotalVisibility;
export { selectTicketTotalDomain, makeSelectTicketTotalVisibility };
