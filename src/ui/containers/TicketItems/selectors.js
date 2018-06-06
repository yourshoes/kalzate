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

const makeSelectMatches = () =>
  createSelector(selectTmpData(), (substate) => substate.matches);

const makeSelectTicketCreatedAtMatches = () =>
  createSelector(makeSelectMatches(), (substate) =>
    substate.tickets.created_at
  );

const makeSelectTicketTmpData = () =>
  createSelector(selectTmpData(), (substate) => substate.ticket);

export default makeSelectTicketItems;
export {
  selectTicketDomain, makeSelectTicketItems,
  makeSelectTicketTmpData,
  makeSelectMatches,
  makeSelectTicketCreatedAtMatches,
};
