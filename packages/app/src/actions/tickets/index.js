import * as ActionTypes from './types';

export function createAddOperation(stock, operation = {}) {
    return {
        type: ActionTypes.CREATE_ADD_OPERATION_ACTION,
        data: {
            stock,
            ...operation,
            operation: 'add'
        }
    };
}

export function createRemoveOperation(stock, operation = {}) {
    return {
        type: ActionTypes.CREATE_REMOVE_OPERATION_ACTION,
        data: {
            stock,
            ...operation,
            operation: 'remove'
        }
    };
}


export function updateTicketPayment(payment) {
    return {
        type: ActionTypes.UPDATE_TICKET_PAYMENT_ACTION,
        data: payment
    };
}

export function addVoucherPaymentAmount(voucherId) {
    return {
        type: ActionTypes.ADD_VOUCHER_PAYMENT_AMOUNT_ACTION,
        data: voucherId
    };
}

export function addVoucherPaymentAmountSuccess(voucherAmount) {
    return {
        type: ActionTypes.ADD_VOUCHER_PAYMENT_AMOUNT_SUCCESS_ACTION,
        data: voucherAmount
    };
}

export function addVoucherPaymentAmountError(voucherAmountError) {
    return {
        type: ActionTypes.ADD_VOUCHER_PAYMENT_AMOUNT_ERROR_ACTION,
        data: voucherAmountError
    };
}

export function removeVoucherPaymentAmount() {
    return {
        type: ActionTypes.REMOVE_VOUCHER_PAYMENT_AMOUNT_ACTION
    };
}

export function createTicket(ticket, settings) {
    return {
        type: ActionTypes.CREATE_TICKET_ACTION,
        data: { ticket, settings }
    };
}

export function createTicketSuccess(ticket) {
    return {
        type: ActionTypes.CREATE_TICKET_SUCCESS_ACTION,
        data: ticket
    };
}

export function loadTicket(value, field = 'id') {
    return {
        type: ActionTypes.LOAD_TICKET_ACTION,
        data: { value, field }
    };
}

export function loadTicketSuccess(ticket) {
    return {
        type: ActionTypes.LOAD_TICKET_SUCCESS_ACTION,
        data: ticket
    };
}

export function getTicketMatches(field, value) {
    return {
        type: ActionTypes.GET_TICKET_MATCHES_ACTION,
        data: { field, value }
    };
}

export function getTicketMatchesError(error) {
    return {
        type: ActionTypes.GET_TICKET_MATCHES_ERROR_ACTION,
        data: error
    };
}

export function getTicketMatchesSuccess(matches) {
    return {
        type: ActionTypes.GET_TICKET_MATCHES_SUCCESS_ACTION,
        data: matches
    };
}