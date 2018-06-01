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

// const makeSelectTicketPayments = () =>
//   createSelector(selectTicketPaymentsDomain(), (substate) =>
//     substate.get('payment')
//   );

const makeSelectTotalAmount = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('totalAmount')
  );

const makeSelectGivenAmount = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('givenAmount')
  );

const makeSelectReturnAmount = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('returnAmount')
  );

const makeSelectCurrency = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('currency')
  );

const makeSelectMethod = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('method')
  );

export default selectTicketPaymentsDomain;
export {
  selectTicketPaymentsDomain,
  makeSelectTotalAmount,
  makeSelectGivenAmount,
  makeSelectReturnAmount,
  makeSelectCurrency,
  makeSelectMethod,
};
