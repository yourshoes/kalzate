import { createSelector } from 'reselect';

const selectTicketDomain = () => (state) => state.ticket;

const selectSettingsData = () => (state) => state.settings;

const makeSelectTicketReadOnly = () =>
  createSelector(
    selectTicketDomain(),
    (substate) =>
      (substate.next &&
        substate.created_at &&
        Number(substate.next) !== Number(substate.created_at)) ||
      substate.items.every(({ amount, amount_return_prev }) => amount === amount_return_prev)
  );

export default selectTicketDomain;
export { selectSettingsData, selectTicketDomain, makeSelectTicketReadOnly };
