import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

import {
    getSubtotal,
    getCreditCardPaymentAmount,
    getCashPaymentAmount,
    getVoucherPaymentAmount,
    getVoucherPaymentConcept,
    parseOperations
} from 'utils/ticket';


export const ticketDomain = (state) => state.ticket;

export const ticketList = (state) => state.tickets;

export const isTicketReadOnly =
    createSelector(
        ticketDomain,
        (ticket) =>
            (ticket.isChecked === true &&
                ticket.nextNode)
    );


export const isNewTicket =
    createSelector(
        ticketDomain,
        (ticket) => ticket.isChecked === false
    );

/**
 * the ticket total amount
 * it can be positive or negative, including zero
 * A positive value means the customer has to pay that amount for the items purchased
 * A negative value means the customer has to get back thath amount either as a voucher or in cash/credit card/...etc
 * A value of zero means the customer does not have to pay anything
 */
export const ticketTotalAmount =
    createSelector(ticketDomain, (ticket) => ticket.operations
        .reduce((acc, operation) => acc + getSubtotal(operation), 0)
    );

/**
 * the ticket provided amount
 * it can only be positive or zero
 * A positive value means the customer has given that amount in order to make the order
 * A value of zero means the customer does not have to pay anything
 */
export const ticketProvidedAmount =
    createSelector(ticketDomain, (ticket) =>
        ticket.payments
            .reduce((acc, { amount }) =>
                amount ? acc + amount : acc, 0)
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

export const ticketBalance =
    createSelector(ticketTotalAmount,
        (totalAmount) => totalAmount >= 0 ? 'positive' : 'negative'
    );

/**
 * the ticket remaining amount
 * it can be positive or zero
 * This is the result of the total minus the provided amount
 */
export const ticketRemainingAmount =
    createSelector(ticketExchangeAmount,
        (exchangeAmount) => exchangeAmount >= 0 ? 0 : Math.round((Math.abs(exchangeAmount) + Number.EPSILON) * 100) / 100);

export const isTicketCheckoutDisabled =
    createSelector(
        ticketDomain,
        ticketTotalAmount,
        ticketProvidedAmount,
        isNewTicket,
        (ticket, totalAmount, providedAmount, isNewTicket) => {
            if (isEmpty(ticket.operations)) {
                return true;
            }

            if (isNewTicket) {
                return totalAmount > providedAmount || totalAmount === 0;
            }

            return totalAmount > 0 && totalAmount > providedAmount;

        }
    );

export const isTicketVoucherCheckoutDisabled =
    createSelector(
        ticketDomain,
        ticketTotalAmount,
        (ticket, totalAmount) => {
            return isEmpty(ticket.operations) || totalAmount >= 0;
        }
    );


export const ticketPayments =
    createSelector(
        ticketDomain,
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

export const ticketVoucherPaymentConcept =
    createSelector(
        ticketPayments,
        (payments) => getVoucherPaymentConcept(payments)
    );

export const ticketOperations =
    createSelector(
        ticketDomain,
        ({ operations = [], history = [] }) => {

            if (!history.length) {
                return operations;
            }

            return parseOperations(history, operations);
        }
    );

export const isEmptyTicket =
    createSelector(
        ticketOperations,
        (operations) => operations.length === 0
    );

export const ticket =
    createSelector(
        ticketDomain,
        isTicketReadOnly,
        ticketBalance,
        ticketVoucherPaymentAmount,
        ticketTotalAmount,
        (ticket, isTicketReadOnly, balance, voucherAmount, totalAmount) =>
            ({
                ...ticket,
                balance,
                isVoucher: voucherAmount > totalAmount,
                ...(!isTicketReadOnly && { created_at: undefined })
            })
    );