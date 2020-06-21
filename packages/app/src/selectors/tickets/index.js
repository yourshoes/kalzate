import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

import {
    getSubtotal,
    getCreditCardPaymentAmount,
    getCashPaymentAmount,
    getVoucherPaymentAmount
} from 'utils/ticket';


export const ticket = (state) => state.ticket;

export const isTicketReadOnly =
    createSelector(
        ticket,
        (ticket) =>
            (ticket.isChecked === true &&
                ticket.nextNode !== null)
    );


export const isNewTicket =
    createSelector(
        ticket,
        (ticket) => ticket.isChecked === false
    );

export const isEmptyTicket =
    createSelector(
        ticket,
        (ticket) => ticket.operations.length === 0
    );

/**
 * the ticket total amount
 * it can be positive or negative, including zero
 * A positive value means the customer has to pay that amount for the items purchased
 * A negative value means the customer has to get back thath amount either as a voucher or in cash/credit card/...etc
 * A value of zero means the customer does not have to pay anything
 */
export const ticketTotalAmount =
    createSelector(ticket, (ticket) => ticket.operations
        .reduce((acc, operation) => acc + getSubtotal(operation), 0)
    );

/**
 * the ticket provided amount
 * it can only be positive or zero
 * A positive value means the customer has given that amount in order to make the order
 * A value of zero means the customer does not have to pay anything
 */
export const ticketProvidedAmount =
    createSelector(ticket, (ticket) =>
        ticket.payments
            .reduce((acc, { amount }) => acc + amount, 0)
    );

/**
 * the ticket exchange amount
 * it can be positive or negative, including zero
 * A positive value means the customer has to receive that amount either as a voucher or in cash
 * A negative value means the customer has to pay that amount to make the order
 * A value of zero means the customer does not have to pay anything
 */
export const ticketExchangeAmount =
    createSelector(
        ticketTotalAmount,
        ticketProvidedAmount,
        (totalAmount, providedAmount) => providedAmount - totalAmount
    );


export const isTicketCheckoutDisabled =
    createSelector(
        ticket,
        isNewTicket,
        ticketTotalAmount,
        ticketProvidedAmount,
        (ticket, isNew, totalAmount, providedAmount) => {

            if (isNew) {
                return isEmpty(ticket.operations) || totalAmount > providedAmount;
            }

            return false;
        }
    );


export const ticketPayments =
    createSelector(
        ticket,
        ({ payments }) => payments
    );

export const ticketCreditCardPaymentAmount =
    createSelector(
        ticketPayments,
        (payments) => getCreditCardPaymentAmount(payments)
    );

export const ticketCashPaymentAmount =
    createSelector(
        ticketPayments,
        (payments) => getCashPaymentAmount(payments)
    );

export const ticketVoucherPaymentAmount =
    createSelector(
        ticketPayments,
        (payments) => getVoucherPaymentAmount(payments)
    );
