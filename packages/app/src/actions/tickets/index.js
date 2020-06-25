import * as ActionTypes from './types';

export function addStockToTicket(stockItem) {
    return {
        type: ActionTypes.ADD_STOCK_TO_TICKET_ACTION,
        data: {
            ...stockItem,
            discountType: 'fixed',
            discountValue: 0,
            amount: 1,
            operation: 'add'
        },
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

export function removeStockFromTicket(operationIndexPosition) {
    return {
        type: ActionTypes.REMOVE_STOCK_FROM_TICKET_ACTION,
        data: {
            operationIndexPosition
        }
    };
}

export function updateTicketPayment(payment) {
    return {
        type: ActionTypes.UPDATE_TICKET_PAYMENT_ACTION,
        data: payment
    };
}