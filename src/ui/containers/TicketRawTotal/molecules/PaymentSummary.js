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
      Hey Hey ticket goes here
    </PaymentContainer>
  );
}

PaymentSummary.propTypes = {
};

export default PaymentSummary;
