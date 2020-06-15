/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import PaymentSection from '../atoms/PaymentSection';
import GivenAmount from '../atoms/GivenAmount';

export function PaymentGiven({
  currency,
  givenAmount }) {
  return (
    <PaymentSection>
      <GivenAmount>
        {givenAmount.toFixed(2)} {currency}
      </GivenAmount>
    </PaymentSection>
  );
}

PaymentGiven.propTypes = {};

export default PaymentGiven;
