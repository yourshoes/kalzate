import * as ActionTypes from './types';

export function addStockToTicket(stockItem, options = {}) {
    return {
        type: ActionTypes.ADD_STOCK_TO_TICKET_ACTION,
        data: {
            stockItem: {
                ...stockItem,
                discountType: 'fixed',
                discountValue: 0,
            },
            options: {
                incremental: true,
                ...options,
                operationType: 'add',

            }
        },
    };
}

export function returnItemFromTicket(item) {
    return {
        type: ActionTypes.RETURN_ITEM_FROM_TICKET_ACTION,
        data: {
            ...item,
            operation: 'return',
            discountType: 'fixed',
            discountValue: 0,
        },
    };
}

export function removeStockFromTicket(operationReference) {
    return {
        type: ActionTypes.REMOVE_STOCK_FROM_TICKET_ACTION,
        data: {
            operationReference
        }
    };
}

export function updateTicketOperation(reference, data) {
    return {
        type: ActionTypes.UPDATE_TICKET_OPERATION_ACTION,
        data: {
            reference,
            ...data
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
