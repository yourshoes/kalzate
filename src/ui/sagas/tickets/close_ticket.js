import { takeEvery, put, call, select } from 'redux-saga/effects';
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
  TICKET_RETURN_STATE,
} from 'ui/constants';
import {
  REFRESH_STOCK_ACTION,
} from 'ui/containers/StockItems/constants';
import { compileTicket } from 'ui/utils/ticket';

function* closeTicket(action) {
  try {
    const { ticket, options } = action;
    const { state, relatesTo } = options;
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
        response = yield call(
          (...args) => Tickets().sell(...args),
          finalTicket
        );
        // @todo DANGEROUS: as we are using select effect. this saga get coupled
        // with the state shape so if for any reason in the future the state changes
        // (i.e. from stock.limit to stock.itemsPerPage) then this saga has to be
        // updated too. So it is better to avoid using select as much as possible
        // However in this case it is not so easy to avoid it, so at least we would
        // have to move the selector (i.e. (store) => store.stock.limit) to a common
        // shared location so all react components/sagas use same selector and if
        // the state shape changes later in the future, only that selector has to
        // be updated. See https://github.com/redux-saga/redux-saga/issues/640
        // and https://github.com/redux-saga/redux-saga/tree/master/docs/api#selectselector-args
        // Another way to solve this would be using the RxDB query subscriptions so
        // whenever the stock gets update, it is refreshed in the StockItems Component
        yield put({
          limit: yield select((store) => store.stock.limit),
          skip: yield select((store) => store.stock.skip),
          type: REFRESH_STOCK_ACTION,
        });
        // END DANGEROUS
        yield put({
          content: compileTicket(options.settings, response._data),
          printerName: options.settings.printerName,
          printerIP: options.settings.printerIP,
          type: PRINT_TICKET_ACTION,
        });
        break;
      case TICKET_RETURN_STATE:

        response = yield call(
          (...args) => Tickets().sellBack(...args),
          { ...finalTicket, relatesTo }
        );
        yield put({
          limit: yield select((store) => store.stock.limit),
          skip: yield select((store) => store.stock.skip),
          type: REFRESH_STOCK_ACTION,
        });
        // Update stock
        // for (const stockItem of ticket.items) {
        //   let amount = (stockItem.totalAmount + stockItem.amount_return);
        //   if (stockItem.amount_return === undefined) {
        //     amount = (stockItem.totalAmount - stockItem.amount) < 0 ? 0 : stockItem.totalAmount - stockItem.amount;
        //   }
        //   const stock = omit({ ...stockItem, amount }, ['totalAmount', 'amount_return']);
        //   yield put({
        //     stock,
        //     type: UPDATE_STOCK_ACTION,
        //   });
        // }
        // console.log('...', omit({ ...finalTicket, relatesTo: options.relatesTo }, ['id', 'created_at']));
        // response = yield call(
        //   (...args) => Tickets().save(...args),
        //   omit({ ...finalTicket, relatesTo: options.relatesTo }, ['id', 'created_at', '_rev'])
        // );
        // console.log(compileTicket(options.settings, response._data));
        // yield put({
        //   content: compileTicket(options.settings, response._data),
        //   settings: options.settings,
        //   type: PRINT_TICKET_ACTION,
        // });
        yield put({
          content: compileTicket(options.settings, response._data),
          printerName: options.settings.printerName,
          printerIP: options.settings.printerIP,
          type: PRINT_TICKET_ACTION,
        });
        break;
      default: throw Error('No ticket state found');
    }

    console.log(response);
    // New ticket
    if (state === TICKET_SOLD_STATE || state === TICKET_RETURN_STATE) {
      yield put({
        ...action,
        type: REMOVE_TICKET_ACTION,
      });
    }
    // Save to menu
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
