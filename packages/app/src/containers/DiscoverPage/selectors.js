import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectChartsDomain = () => (state) => state.charts;

const makeSelectSalesChart = () =>
  createSelector(selectChartsDomain(), (substate) =>
    substate.salesChart
  );

const makeSelectTicketsChart = () =>
  createSelector(selectChartsDomain(), (substate) =>
    substate.ticketsChart
  );

const makeSelectStockChart = () =>
  createSelector(selectChartsDomain(), (substate) =>
    substate.stockChart
  );

const makeSelectAlertChart = () =>
  createSelector(selectChartsDomain(), (substate) =>
    substate.alertChart
  );


export default makeSelectSalesChart;
export {
  makeSelectSalesChart,
  makeSelectTicketsChart,
  makeSelectStockChart,
  makeSelectAlertChart,
};
