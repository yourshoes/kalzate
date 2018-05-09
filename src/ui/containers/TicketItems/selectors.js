import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTicketPaymentsDomain = () => (state) => state.get('ticket');

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketPayments
 */

const makeSelectTicketItems = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('items')
  );

export default makeSelectTicketItems;
export { selectTicketPaymentsDomain };
