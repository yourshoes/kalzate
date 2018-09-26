import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'ui/db';
import {
  LOAD_TICKET_ACTION,
  LOAD_TICKET_ERROR_ACTION,
  LOAD_TICKET_SUCCESS_ACTION,
} from 'ui/containers/TicketItems/constants';

function* loadTickets(action) {
  try {
    const { options, ticket } = action;
    if (options.fetch) {
      const finalTicket = yield call(
        (createdAt) => Tickets().get({
          match: {
            created_at: {
              $eq: Number(createdAt),
            },
          },
          count: false,
        }),
        ticket.created_at,
      );
      return yield put({
        type: LOAD_TICKET_SUCCESS_ACTION,
        ticket: finalTicket[0],
      });
    }
    yield put({
      type: LOAD_TICKET_SUCCESS_ACTION,
      ticket,
    });
  } catch (e) {
    yield put({ type: LOAD_TICKET_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(LOAD_TICKET_ACTION, loadTickets);
