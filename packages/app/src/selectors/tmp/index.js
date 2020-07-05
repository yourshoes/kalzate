import { createSelector } from 'reselect';

export const tmpDomain = (state) => state.tmp;

export const errors =
    createSelector(
        tmpDomain,
        (tmp) =>
            tmp.errors
    );

export const ticketVoucherPaymentError =
    createSelector(
        errors,
        ({ voucher }) => voucher
    );
