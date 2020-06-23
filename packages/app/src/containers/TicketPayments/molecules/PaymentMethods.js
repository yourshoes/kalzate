/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import {
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_PHONE,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_TICKET,
} from 'config';
import PaymentSectionContainer from '../atoms/PaymentSectionContainer';
import messages from '../messages';
import { tickets as ticketsSelectors } from '@kalzate/cy';
import PaymentMethod from '@kalzate/ui';

export function PaymentMethods({
  creditCardPaymentAmount,
  cashPaymentAmount,
  voucherPaymentAmount,
  updateTicketPayment,
  totalAmount,
  intl }) {

  const isPaymentMethodDisabled = totalAmount <= 0;
  console.log(creditCardPaymentAmount, '<<<<<');
  return (
    <PaymentSectionContainer>
      <PaymentMethod
        data-cy={ticketsSelectors.PAYMENT_METHOD_CREDIT_CARD}
        onChange={(value) => updateTicketPayment({
          method: PAYMENT_METHOD_CREDIT_CARD,
          amount: value
        })}
        onEnter={() => updateTicketPayment({
          method: PAYMENT_METHOD_CREDIT_CARD,
          amount: totalAmount
        })}
        placeholder={intl.formatMessage(messages.creditcard)}
        disabled={isPaymentMethodDisabled}
        value={creditCardPaymentAmount}
        icon={<Octicon mega name="credit-card" verticalAlign='middle' />} />
      <PaymentMethod
        data-cy={ticketsSelectors.PAYMENT_METHOD_CASH}
        disabled={isPaymentMethodDisabled}
        placeholder={intl.formatMessage(messages.cash)}
        value={cashPaymentAmount}
        icon={<Octicon mega name="tag" verticalAlign='middle' />} />
      <PaymentMethod
        data-cy={ticketsSelectors.PAYMENT_METHOD_VOUCHER}
        disabled={isPaymentMethodDisabled}
        placeholder={intl.formatMessage(messages.ticket)}
        value={voucherPaymentAmount}
        icon={<Octicon mega name="gift" verticalAlign='middle' />} />
      <PaymentMethod
        data-cy={ticketsSelectors.PAYMENT_METHOD_PHONE}
        disabled={true}
        placeholder={intl.formatMessage(messages.phone)}
        icon={<Octicon mega name="device-mobile" verticalAlign='middle' />} />
    </PaymentSectionContainer>
  );
}

PaymentMethods.propTypes = {
  method: PropTypes.string,
  setMethod: PropTypes.func.isRequired,
};

export default PaymentMethods;
