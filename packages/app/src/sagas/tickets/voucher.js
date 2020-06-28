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

    return yield put(addVoucherPaymentAmountSuccess(100.34));
    const ticket = yield call(
      (voucherId) => Tickets().query('ticketById', voucherId),
      voucherId
    );

    console.log('voucher ticket', ticket);

    if (!ticket.isVoucher) {
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
