import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketItems state domain
 */
const selectTicketItemsDomain = () => (state) => state.get('ticketItems');

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketItems
 */

const makeSelectTicketItems = () =>
  createSelector(selectTicketItemsDomain(), (substate) => substate.toJS());

export default makeSelectTicketItems;
export { selectTicketItemsDomain };
