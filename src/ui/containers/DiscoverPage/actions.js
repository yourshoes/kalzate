/*
 *
 * WorkSpacePage actions
 *
 */

import {
  LOAD_CHART_DATA_ACTION,
  SALES_CHART,
  TICKETS_CHART,
  STOCK_CHART,
  ALERT_CHART,
} from './constants';

export function loadChartsData({ charts = [SALES_CHART, TICKETS_CHART, STOCK_CHART, ALERT_CHART] }) {
  return {
    type: LOAD_CHART_DATA_ACTION,
    charts,
  };
}
