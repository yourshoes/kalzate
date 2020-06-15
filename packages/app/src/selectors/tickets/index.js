import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

const ADD_ITEM_OPERATION = 'add';
const RETURN_ITEM_OPERATION = 'return';
const DISCOUNT_PERCENTAGE_TYPE = 'percentage';
const DISCOUNT_FIXED_TYPE = 'fixed';

export const calculateSubtotal = ({ amount, price, discountType, discountValue }) => {
    let subtotal = amount * price;

    if (discountType === DISCOUNT_PERCENTAGE_TYPE) {
        subtotal *= (1 - discountValue / 100);
    }
    else if (discountType === DISCOUNT_FIXED_TYPE) {
        subtotal -= discountValue;
    }

    if (subtotal >= (amount * price) || subtotal <= 0) {
        return 0;
    }

    return subtotal;
}

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

export const ticketTotalAmount =
    createSelector(ticket, (ticket) =>
        ticket.operations
            .reduce((acc, { operation, price, amount, discountType, discountValue }) => {
                const subtotal = calculateSubtotal({ amount, price, discountType, discountValue });

                if (operation === ADD_ITEM_OPERATION) { return acc + subtotal }
                if (operation === RETURN_ITEM_OPERATION) { return acc - subtotal }

                throw new Error(`operation type "${operation}" unknown, use "${ADD_ITEM_OPERATION}" or "${RETURN_ITEM_OPERATION}"`)

            }, 0)
    );

export const ticketProvidedAmount =
    createSelector(ticket, (ticket) =>
        ticket.payments
            .reduce((acc, { amount }) => acc + amount, 0)
    );

export const ticketExchangeAmount =
    createSelector(
        ticketTotalAmount,
        ticketProvidedAmount,
        (totalAmount, providedAmount) => totalAmount - providedAmount
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
