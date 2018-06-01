import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTickets = () => (state) => state.get('tickets');


/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketPayments
 */

const makeSelectTicketItems = () =>
  createSelector(selectTickets(), (substate) =>
    substate.get('items')
  );


export default selectTickets;
export {
  selectTickets,
  makeSelectTicketItems,
};
