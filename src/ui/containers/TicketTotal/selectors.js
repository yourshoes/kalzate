import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTicketPaymentsDomain = () => (state) => state.ticket;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketPayments
 */

// const makeSelectTicketPayments = () =>
//   createSelector(selectTicketPaymentsDomain(), (substate) =>
//     substate.payment')
//   );

const makeSelectTotalAmount = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.totalAmount
  );

const makeSelectGivenAmount = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.givenAmount
  );

const makeSelectReturnAmount = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.returnAmount
  );

const makeSelectCurrency = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.currency
  );

const makeSelectMethod = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.method
  );

const makeSelectCreationDate = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.created_at
  );

export default selectTicketPaymentsDomain;
export {
  selectTicketPaymentsDomain,
  makeSelectTotalAmount,
  makeSelectGivenAmount,
  makeSelectReturnAmount,
  makeSelectCurrency,
  makeSelectMethod,
  makeSelectCreationDate,
};
