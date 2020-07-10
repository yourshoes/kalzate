import { takeEvery, put } from 'redux-saga/effects';
import {
  PRINT_TICKET_ACTION,
  PRINT_TICKET_SUCCESS_ACTION,
  PRINT_TICKET_ERROR_ACTION,
} from 'containers/TicketSellingPage/constants';

function print(text, options) {
  try {
    console.log(text, options);
    window.ipcRenderer.send('print-ticket', text, options);
  } catch (error) {
    console.error(error);
  }
}

function* printTicket(action) {
  try {
    const { content, printerName, printerIP } = action;

    if(window.isElectron){
      print(content, { printerName, printerIP });
    }
    else {
      console.log(content, printerName, printerIP);

    }
    
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
