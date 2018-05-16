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

const makeSelectTicketPayments = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('payment')
  );

const makeSelectTotalAmount = () =>
  createSelector(makeSelectTicketPayments(), (substate) =>
    substate.get('totalAmount')
  );

const makeSelectGivenAmount = () =>
  createSelector(makeSelectTicketPayments(), (substate) =>
    substate.get('givenAmount')
  );

const makeSelectReturnAmount = () =>
  createSelector(makeSelectTicketPayments(), (substate) =>
    substate.get('returnAmount')
  );

const makeSelectCurrency = () =>
  createSelector(makeSelectTicketPayments(), (substate) =>
    substate.get('currency')
  );

export default makeSelectTicketPayments;
export {
  selectTicketPaymentsDomain,
  makeSelectTotalAmount,
  makeSelectGivenAmount,
  makeSelectReturnAmount,
  makeSelectCurrency,
};
