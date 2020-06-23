/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import PaymentSection from '../atoms/PaymentSection';
import TotalAmount from '../atoms/TotalAmount';
import { formatPrice } from "utils/ticket";

export function PaymentTotal({
  currency,
  totalAmount }) {
  return (
    <PaymentSection>
      <TotalAmount>
        {formatPrice(totalAmount)}
      </TotalAmount>
    </PaymentSection>
  );
}

PaymentTotal.propTypes = {
};

export default PaymentTotal;
