/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import PaymentSection from '../atoms/PaymentSection';
import TotalAmount from '../atoms/TotalAmount';

export function PaymentTotal({
  currency,
  totalAmount }) {
  return (
    <PaymentSection>
      <TotalAmount>
        {totalAmount.toFixed(2)} {currency}
      </TotalAmount>
    </PaymentSection>
  );
}

PaymentTotal.propTypes = {
};

export default PaymentTotal;
