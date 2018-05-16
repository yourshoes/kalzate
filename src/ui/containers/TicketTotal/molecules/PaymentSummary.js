/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import PaymentContainer from '../atoms/PaymentContainer';
import PaymentTotal from './PaymentTotal';
import PaymentGiven from './PaymentGiven';
import PaymentReturn from './PaymentReturn';

export function PaymentSummary(props) {
  return (
    <PaymentContainer>
      <PaymentTotal {...props} />
      <PaymentGiven {...props} />
      <PaymentReturn {...props} />
    </PaymentContainer>
  );
}

PaymentSummary.propTypes = {
};

export default PaymentSummary;
