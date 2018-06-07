import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'ui/db';
import { omit } from 'lodash';
import {
  CLOSE_TICKET_ACTION,
  CLOSE_TICKET_SUCCESS_ACTION,
  CLOSE_TICKET_ERROR_ACTION,
  REMOVE_TICKET_ACTION,
  PRINT_TICKET_ACTION,
} from 'ui/containers/TicketItems/constants';
import {
  TICKET_SAVE_STATE,
  TICKET_SOLD_STATE,
} from 'ui/constants';
import {
  UPDATE_STOCK_ACTION,
} from 'ui/containers/StockItems/constants';
import { compileTicket } from 'ui/utils/helper';

function* closeTicket(action) {
  try {
    const { ticket, options } = action;
    const { state } = options;
    const finalTicket = { ...ticket, state };
    let response = {};
    console.log(finalTicket);

    switch (state) {

      case TICKET_SAVE_STATE:
        response = yield call(
          (...args) => Tickets().save(...args),
          finalTicket
        );
        break;
      case TICKET_SOLD_STATE:
        // Update stock
        for (const stockItem of ticket.items) {
          const amount = (stockItem.totalAmount - stockItem.amount) < 0 ? 0 : stockItem.totalAmount - stockItem.amount;
          const stock = omit({ ...stockItem, amount }, 'totalAmount');
          yield put({
            stock,
            type: UPDATE_STOCK_ACTION,
          });
        }
        response = yield call(
          (...args) => Tickets().save(...args),
          finalTicket
        );
        console.log(compileTicket(options.settings, response));
        yield put({
          content: compileTicket(options.settings, response),
          settings: options.settings,
          type: PRINT_TICKET_ACTION,
        });
        break;
      default: throw Error('No ticket state found');
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
    console.log(e);
    // @todo print notification if batch mode
    yield put({ type: CLOSE_TICKET_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(CLOSE_TICKET_ACTION, closeTicket);
