import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'db';
import {
  GET_MATCHES_TICKETS_ACTION,
  GET_MATCHES_TICKETS_ERROR_ACTION,
  GET_MATCHES_TICKETS_SUCCESS_ACTION,
} from 'containers/TicketSellingPage/constants';

function* matchesTickets(action) {
  try {
    const { field, value } = action;
    const { items } = yield call((...args) => Tickets().matches(...args), field, value);
    yield put({
      type: GET_MATCHES_TICKETS_SUCCESS_ACTION,
      field,
      items,
    });
  } catch (e) {
    yield put({ type: GET_MATCHES_TICKETS_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(GET_MATCHES_TICKETS_ACTION, matchesTickets);
