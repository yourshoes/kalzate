import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTicketDomain = () => (state) => state.ticket;

const selectTmpData = () => (state) => state.tmp;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketPayments
 */

const makeSelectTicketItems = () =>
  createSelector(selectTicketDomain(), (substate) =>
    substate.items
  );


const makeSelectTicketTmpData = () =>
  createSelector(selectTmpData(), (substate) => substate.ticket);

export default makeSelectTicketItems;
export {
  selectTicketDomain, makeSelectTicketItems,
  makeSelectTicketTmpData,
};
