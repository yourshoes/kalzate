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
  givenAmount,
  setTicketGivenAmount }) {
  return (
    <PaymentSection>
      <GivenAmount
        type="text"
        onBlur={(event) =>
          (event.target.value = `${givenAmount} ${currency}`)}
        onDoubleClick={(event) => (event.target.value = '')}
        defaultValue={`${givenAmount} ${currency}`}
        onChange={(event) => event.target.value ? setTicketGivenAmount(event.target.value) : null}
      />

    </PaymentSection>
  );
}

PaymentGiven.propTypes = {
};

export default PaymentGiven;
