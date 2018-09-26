import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'ui/db';
import { DEFAULT_TICKET_ITEMS_LIMIT } from 'ui/constants';
import {
  SEARCH_TICKETS_ACTION,
  SEARCH_TICKETS_ERROR_ACTION,
  SEARCH_TICKETS_SUCCESS_ACTION,
} from 'ui/containers/TicketItems/constants';

function* searchTickets(action) {
  try {
    const { field, value, operator } = action;

    const tickets = yield call(
      (...options) => field ? Tickets().get({
        match: {
          [options.field]: {
            [options.operator]: options.value,
          },
        },
        count: true,
      }) : Tickets().query(Tickets().queries.dailyTickets(DEFAULT_TICKET_ITEMS_LIMIT, 0)), field, value, operator);
    console.log(tickets);
    return yield put({
      type: SEARCH_TICKETS_SUCCESS_ACTION,
      tickets,
    });
  } catch (e) {
    yield put({ type: SEARCH_TICKETS_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(SEARCH_TICKETS_ACTION, searchTickets);
