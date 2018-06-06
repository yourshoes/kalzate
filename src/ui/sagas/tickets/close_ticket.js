import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'ui/db';
import {
  CLOSE_TICKET_ACTION,
  CLOSE_TICKET_SUCCESS_ACTION,
  CLOSE_TICKET_ERROR_ACTION,
  REMOVE_TICKET_ACTION,
} from 'ui/containers/TicketItems/constants';
import {
  TICKET_SAVE_STATE,
  // TICKET_DONE_STATE,
} from 'ui/constants';

function* closeTicket(action) {
  try {
    const { ticket, state } = action;
    const finalTicket = { ...ticket, state };
    let response = {};
    console.log(finalTicket);
    if (state === TICKET_SAVE_STATE) {
      response = yield call(
        (...args) => Tickets().save(...args),
        finalTicket
      );
    }
    console.log(response);
    // if (state === TICKET_DONE_STATE) {
    //   // print ticket
    //   yield call((...args) => Ticket().checkout(...args), ticket, state);

    // }
    // if ticket does not exists yet, then add to menu
    if (!finalTicket.id) {
      yield put({
        ...action,
        type: REMOVE_TICKET_ACTION,
      });
    }
    yield put({
      ticket: response,
      type: CLOSE_TICKET_SUCCESS_ACTION,
    });
  } catch (e) {
    // @todo print notification if batch mode
    yield put({ type: CLOSE_TICKET_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(CLOSE_TICKET_ACTION, closeTicket);
