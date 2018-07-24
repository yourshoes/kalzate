import { takeEvery, put } from 'redux-saga/effects';
import {
  LOAD_CHART_DATA_ACTION,
  LOAD_CHART_DATA_SUCCESS_ACTION,
} from 'ui/containers/DiscoverPage/constants';

function* loadChartDataSaga(action) {
  try {
    yield put({
      type: LOAD_CHART_DATA_SUCCESS_ACTION, data: [
        { day: 'Mon', amount: '200.56' },
        { day: 'Tue', amount: '153.94' },
        { day: 'Wed', amount: '208.56' },
        { day: 'Thu', amount: '501.89' },
        { day: 'Fri', amount: '377.89' },
        { day: 'Sat', amount: '177.89' },
        { day: 'Sun', amount: '277.89' },
      ], chart: 'salesChart',
    });
    yield put({
      type: LOAD_CHART_DATA_SUCCESS_ACTION, data: [
        { day: 'Mon', minimum: '14', maximum: '65', median: '33', quartile1: '20', quartile3: '35' },
        { day: 'Tue', minimum: '25', maximum: '73', median: '25', quartile1: '25', quartile3: '30' },
        { day: 'Wed', minimum: '15', maximum: '40', median: '25', quartile1: '17', quartile3: '28' },
        { day: 'Thu', minimum: '18', maximum: '55', median: '33', quartile1: '28', quartile3: '42' },
        { day: 'Fri', minimum: '14', maximum: '66', median: '35', quartile1: '22', quartile3: '45' },
        { day: 'Sat', minimum: '22', maximum: '70', median: '34', quartile1: '28', quartile3: '42' },
        { day: 'Sun', minimum: '14', maximum: '65', median: '33', quartile1: '30', quartile3: '50' },
      ], chart: 'ticketsChart',
    });
    yield put({
      type: LOAD_CHART_DATA_SUCCESS_ACTION, data: [
        { amount: 0, price: '0', sold: 0, title: 'Brand1' },
        { amount: 50, price: '30', sold: 200, title: 'Brand1' },
        { amount: 50, price: '0', sold: 70, title: 'Brand1' },
        { amount: 50, price: '20.56', sold: 0, title: 'Brand1' },
        { amount: 50, price: '20.56', sold: 111, title: 'Brand1' },
        { amount: 30, price: '10.56', sold: 200, title: 'Brand2' },
        { amount: 30, price: '30.00', sold: 10, title: 'Brand3' },
        { amount: 300, price: '30.00', sold: 10, title: 'Brand3' },
        { amount: 60, price: '15.90', sold: 160, title: 'Brand4' }], chart: 'stockChart',
    });
    yield put({
      type: LOAD_CHART_DATA_SUCCESS_ACTION, data: [
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
      ], chart: 'alertChart',
    });
  } catch (e) {

  }
}

export default takeEvery(LOAD_CHART_DATA_ACTION, loadChartDataSaga);
