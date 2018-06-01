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

const makeSelectMethod = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('method')
  );

// const makeSelectTicketPayments = () =>
//   createSelector(selectTicketPaymentsDomain(), (substate) =>
//     substate.get('payment')
//   );

export default selectTicketPaymentsDomain;
export { selectTicketPaymentsDomain, makeSelectMethod };
