/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import PaymentSection from '../atoms/PaymentSection';
import GivenAmount from '../atoms/GivenAmount';
import { formatPrice } from "utils/ticket";

export function PaymentGiven({
  currency,
  givenAmount }) {
  return (
    <PaymentSection>
      <GivenAmount>
        {formatPrice(givenAmount)} {currency}
      </GivenAmount>
    </PaymentSection>
  );
}

PaymentGiven.propTypes = {};

export default PaymentGiven;
