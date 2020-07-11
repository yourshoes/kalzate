import { takeEvery, put } from 'redux-saga/effects';
import {
  PRINT_TICKET_ACTION,
  PRINT_TICKET_SUCCESS_ACTION,
  PRINT_TICKET_ERROR_ACTION,
} from 'containers/TicketSellingPage/constants';

function print(text, options) {
   window.ipcRenderer.send('print-ticket', text, options);
}

function* printTicket(action) {
  try {
    const { content, options } = action;

    if(window.isElectron){
      print(content, options);
    }
    else {
      console.log('web printing', content, options);
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
