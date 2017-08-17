import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * Select App Ticket
 */
const selectTicket = (state) => state.getIn(['global', 'ticket']);

/**
 * Select ticket total amount
 */

const makeSelectTotalAmount = () =>
  createSelector(selectTicket, (ticket) => ticket.get('totalAmount'));

/**
 * Select ticket total amount
 */

const makeSelectTakeAmount = () =>
  createSelector(selectTicket, (ticket) => ticket.get('takeAmount'));

const makeSelectReturnAmount = () =>
  createSelector(selectTicket, (ticket) => ticket.get('returnAmount'));
/**
 * Select ticket total amount
 */

const makeSelectCurrency = () =>
  createSelector(selectTicket, (ticket) => ticket.get('currency'));

export {
  makeSelectLocationState,
  makeSelectTotalAmount,
  makeSelectTakeAmount,
  makeSelectReturnAmount,
  makeSelectCurrency,
};
