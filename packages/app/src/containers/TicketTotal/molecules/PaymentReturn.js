/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import PaymentSection from '../atoms/PaymentSection';
import ReturnAmount from '../atoms/ReturnAmount';
import { formatPrice } from "utils/ticket";

export function PaymentReturn({
  currency,
  returnAmount }) {
  return (
    <PaymentSection>
      <ReturnAmount>
        {formatPrice(returnAmount)}
      </ReturnAmount>
    </PaymentSection>
  );
}

PaymentReturn.propTypes = {
};

export default PaymentReturn;
