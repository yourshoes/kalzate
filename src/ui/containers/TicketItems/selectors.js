import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTicketPaymentsDomain = () => (state) => state.get('ticket');

const selectTmpData = () => (state) => state.get('tmp');

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


const makeSelectTicketTmpData = () =>
  createSelector(selectTmpData(), (substate) => substate.get('ticket'));

export default makeSelectTicketItems;
export {
  selectTicketPaymentsDomain, makeSelectTicketItems,
  makeSelectTicketTmpData,
};
