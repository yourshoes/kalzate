import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'db';
import {
  GET_TICKET_MATCHES_ACTION,
} from 'actions/tickets/types';
import {
  getTicketMatchesError,
  getTicketMatchesSuccess
} from 'actions/tickets';

function* matchesTickets(action) {
  try {
    const { field, value } = action.data;
    const { items: ticketMatches } = yield call((...args) => Tickets().query('ticketMatches', field, value), field, value);
    yield put(getTicketMatchesSuccess(ticketMatches));
  } catch (e) {
    yield put(getTicketMatchesError(e));
  }
}

export default takeEvery(GET_TICKET_MATCHES_ACTION, matchesTickets);
