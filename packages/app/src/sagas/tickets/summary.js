import { takeEvery, put, call } from 'redux-saga/effects';
import flatten from 'lodash/flatten';
import { Tickets } from 'db';
import {
  PRINT_TICKET_ACTION,
  PRINT_DAILY_SUMMARY_TICKET_ACTION,
} from 'actions/tickets/types';
import { compileTicket } from 'utils/receipt';

function* summaryTickets(action) {
  try {
    const settings = action.data;

    const { items } = yield call(() => Tickets().query('dailyTicketOperations'));

    if (!items || !items.length) {
      return;
    }

    const summaryTicket = {
      isDailySummaryTicket: true,
      payments: [],
      operations: flatten(items)
    }

    const ticketReceipt = compileTicket(settings, summaryTicket);

    yield put({
      content: ticketReceipt,
      printerName: settings.printerName,
      printerIP: settings.printerIP,
      type: PRINT_TICKET_ACTION,
    });
  } catch (e) {
    // Create general error notification action to display errors as toasts or in a sidebar notification panel
    console.error('Summary ticket could not be printed', e)
  }
}

export default takeEvery(PRINT_DAILY_SUMMARY_TICKET_ACTION, summaryTickets);
