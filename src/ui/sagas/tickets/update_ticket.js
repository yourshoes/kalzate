import { takeEvery, put } from 'redux-saga/effects';
// import * as Constants from 'ui/constants';
import {
  UPDATE_TICKET_ACTION,
  UPDATE_TICKET_SUCCESS_ACTION,
  UPDATE_TICKET_ERROR_ACTION,
} from 'ui/containers/TicketItems/constants';

function* updateTicket(action) {
  try {
    yield put({
      ...action,
      type: action.put,
    });
    yield put({
      ...action,
      type: UPDATE_TICKET_SUCCESS_ACTION,
    });
  } catch (e) {
    // @todo print notification if batch mode
    yield put({ type: UPDATE_TICKET_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(UPDATE_TICKET_ACTION, updateTicket);
