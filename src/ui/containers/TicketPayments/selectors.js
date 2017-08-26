import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTicketPaymentsDomain = () => (state) => state.get('ticketPayments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TicketPayments
 */

const makeSelectTicketPayments = () => createSelector(
  selectTicketPaymentsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTicketPayments;
export {
  selectTicketPaymentsDomain,
};
