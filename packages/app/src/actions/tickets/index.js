import {
    ADD_STOCK_TO_TICKET_ACTION,
    UPDATE_TICKET_OPERATION_ACTION,
    REMOVE_STOCK_FROM_TICKET_ACTION
} from './types';

export function addStockToTicket(stockItem) {
    return {
        type: ADD_STOCK_TO_TICKET_ACTION,
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
        type: UPDATE_TICKET_OPERATION_ACTION,
        data: {
            reference,
            ...data
        }
    };
}

export function removeStockFromTicket(operationIndexPosition) {
    return {
        type: REMOVE_STOCK_FROM_TICKET_ACTION,
        data: {
            operationIndexPosition
        }
    };
}
