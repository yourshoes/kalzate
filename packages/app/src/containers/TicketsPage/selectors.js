import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketTotal state domain
 */
const selectTicket = () => (state) => state.ticket;
const selectTicketVisibility = () => (state) => state.tmp.visibility.tickets;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketTotal
 */

const makeSelectTicketTotalVisibility = () =>
  createSelector(
    selectTicketVisibility(),
    (substate) => substate.total
  );
const makeSelectTicketReadOnly = () =>
  createSelector(
    selectTicket(),
    (substate) =>
      (substate.next &&
        substate.created_at &&
        Number(substate.next) !== Number(substate.created_at)) ||
      substate.items.every(({ amount, amount_return_prev }) => amount === amount_return_prev)
  );

const makeSelectTicketPaymentsVisibility = () =>
  createSelector(
    selectTicketVisibility(),
    (substate) => substate.payments
  );
const makeSelectTicketState = () =>
  createSelector(
    selectTicket(),
    (substate) => substate.state
  );

export {
  selectTicket,
  makeSelectTicketTotalVisibility,
  makeSelectTicketPaymentsVisibility,
  makeSelectTicketState,
  makeSelectTicketReadOnly,
};
