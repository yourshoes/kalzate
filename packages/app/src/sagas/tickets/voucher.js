import { takeEvery, put, call } from 'redux-saga/effects';
import { Tickets } from 'db';
import { DEFAULT_TICKET_ITEMS_LIMIT } from 'config';
import {
  ADD_VOUCHER_PAYMENT_AMOUNT_ACTION,
} from 'actions/tickets/types';
import {
  addVoucherPaymentAmountSuccess,
  addVoucherPaymentAmountError
} from 'actions/tickets';
import { ticketExchangeAmount } from 'selectors/tickets';

function* voucherTickets(action) {
  try {
    const { data: voucherId } = action;

    console.log('get ticket', voucherId)

    const { items, total } = yield call(
      (voucherId) => Tickets().query('ticketByCreationDate', voucherId),
      voucherId
    );

    if (total !== 1) {
      return yield put(addVoucherPaymentAmountError('INVALID_VOUCHER'));
    }

    const ticket = items[0];

    console.log(ticket, '??')

    if (!ticket || !ticket.isVoucher) {
      return yield put(addVoucherPaymentAmountError('INVALID_VOUCHER'));
    }

    if (ticket.hasVoucherExpired) {
      return yield put(addVoucherPaymentAmountError('EXPIRED_VOUCHER'));
    }

    const voucherAmount = ticketExchangeAmount({ ticket });

    if (voucherAmount <= 0) {
      return yield put(addVoucherPaymentAmountError('INVALID_VOUCHER'));
    }
    console.log('voucher amount', voucherAmount);
    yield put(addVoucherPaymentAmountSuccess(voucherAmount));
  } catch (error) {
    console.log('voucher error', error);
    yield put(addVoucherPaymentAmountError(error.message));
  }
}

export default takeEvery(ADD_VOUCHER_PAYMENT_AMOUNT_ACTION, voucherTickets);
