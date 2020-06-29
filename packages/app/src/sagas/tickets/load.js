import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'db';
import {
  LOAD_TICKET_ERROR_ACTION,
} from 'containers/TicketSellingPage/constants';

import { LOAD_TICKET_ACTION } from 'actions/tickets/types';
import { loadTicketSuccess } from 'actions/tickets';

function* loadTickets(action) {
  try {
    const { data: ticketId } = action;

    const ticket = yield call(
      (ticketId) =>
        Tickets().open({ value: ticketId }),
      ticketId
    );
    return yield put(loadTicketSuccess(ticket));
  } catch (e) {
    yield put({ type: LOAD_TICKET_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(LOAD_TICKET_ACTION, loadTickets);
