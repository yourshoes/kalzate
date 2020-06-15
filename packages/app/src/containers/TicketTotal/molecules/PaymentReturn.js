/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import PaymentSection from '../atoms/PaymentSection';
import ReturnAmount from '../atoms/ReturnAmount';

export function PaymentReturn({
  currency,
  returnAmount }) {
  return (
    <PaymentSection>
      <ReturnAmount>
        {returnAmount.toFixed(2)} {currency}
      </ReturnAmount>
    </PaymentSection>
  );
}

PaymentReturn.propTypes = {
};

export default PaymentReturn;
