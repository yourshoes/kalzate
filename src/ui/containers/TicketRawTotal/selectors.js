// import { createSelector } from 'reselect';

const selectTicketDomain = () => (state) => state.ticket;

const selectSettingsData = () => (state) => state.settings;

export default selectTicketDomain;
export {
  selectSettingsData,
  selectTicketDomain,
};
