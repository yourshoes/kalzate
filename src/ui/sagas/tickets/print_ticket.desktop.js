import { takeEvery, put } from 'redux-saga/effects';
import {
  PRINT_TICKET_ACTION,
  PRINT_TICKET_SUCCESS_ACTION,
  PRINT_TICKET_ERROR_ACTION,
} from 'ui/containers/TicketItems/constants';
import { ipcRenderer } from 'electron';


function print(text) {
  try {
    ipcRenderer.send('print-ticket', text);
  } catch (error) {
    console.error(error);
  }
}

function* printTicket(action) {
  try {
    const { content, printerName, printerIP } = action;

    console.log('ticket content', content);
    // console.log('ticket content'. content, printerName, printerIP);

    print(content);

    yield put({
      ...action,
      type: PRINT_TICKET_SUCCESS_ACTION,
    });
  } catch (e) {
    // @todo print notification if batch mode
    yield put({ type: PRINT_TICKET_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(PRINT_TICKET_ACTION, printTicket);
