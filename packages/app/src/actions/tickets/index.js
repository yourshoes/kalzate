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

export function loadTicket(ticketId) {
    return {
        type: ActionTypes.LOAD_TICKET_ACTION,
        data: ticketId
    };
}

export function loadTicketSuccess(ticket) {
    return {
        type: ActionTypes.LOAD_TICKET_SUCCESS_ACTION,
        data: ticket
    };
}
