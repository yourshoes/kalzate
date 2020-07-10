import { takeEvery, put, call, select } from 'redux-saga/effects';
import { Tickets } from 'db';
import { createTicketSuccess } from 'actions/tickets';
import { CREATE_TICKET_ACTION } from 'actions/tickets/types';
import {
  CLOSE_TICKET_ERROR_ACTION,
  PRINT_TICKET_ACTION,
} from 'containers/TicketSellingPage/constants';
import { REFRESH_STOCK_ACTION } from 'containers/StockItems/constants';
import { marshallTicket } from 'utils/ticket';
import { compileTicket } from 'utils/receipt';

function* closeTicket(action) {
  try {
    const { ticket, settings } = action.data;

    console.log('create ticket', ticket)

    const ticketListItem = yield call((...args) => Tickets().create(...args), marshallTicket(ticket), true);

    const createdTicket = { ...ticket, ...ticketListItem };

    const ticketReceipt = compileTicket(settings, createdTicket);

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
      content: ticketReceipt,
      options: {
        printerName: settings.printerName,
        printerIp: settings.printerIP,
        printerWidth: '58mm',     
        image: {
          type: 'qrcode',
          value: createdTicket.created_at,
        },     
        copies: 1,     
      },
      type: PRINT_TICKET_ACTION,
    });

    // Save to menu
    yield put(createTicketSuccess(createdTicket));
  } catch (e) {
    console.error(e);
    // @todo print notification if batch mode
    yield put({ type: CLOSE_TICKET_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(CREATE_TICKET_ACTION, closeTicket);
