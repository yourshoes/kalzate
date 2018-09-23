// import { createSelector } from 'reselect';
import { isEqual } from 'lodash';
import { createSelector } from 'reselect';

const selectRoute = () => (state) => state.route;

const makeSelectLoading = () =>
  createSelector(selectRoute(), (substate) => substate.loading);

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.route;
    if (!isEqual(routingState, prevRoutingState)) {
      prevRoutingState = routingState;
    }
    return prevRoutingState;
  };
};

export {
  makeSelectLoading,
  makeSelectLocationState,
};
