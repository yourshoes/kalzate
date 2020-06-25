/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import {
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_VOUCHER,
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
  remainingAmount,
  intl }) {

  const isPaymentMethodDisabled = totalAmount <= 0;
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
          amount: remainingAmount + creditCardPaymentAmount
        })}
        placeholder={intl.formatMessage(messages.creditcard)}
        disabled={isPaymentMethodDisabled}
        value={creditCardPaymentAmount}
        icon={<Octicon mega name="credit-card" verticalAlign='middle' />} />
      <PaymentMethod
        data-cy={ticketsSelectors.PAYMENT_METHOD_CASH}
        onChange={(value) => updateTicketPayment({
          method: PAYMENT_METHOD_CASH,
          amount: value
        })}
        onEnter={() => updateTicketPayment({
          method: PAYMENT_METHOD_CASH,
          amount: remainingAmount + cashPaymentAmount
        })
        }
        placeholder={intl.formatMessage(messages.cash)}
        disabled={isPaymentMethodDisabled}
        value={cashPaymentAmount}
        icon={<Octicon mega name="tag" verticalAlign='middle' />} />
      <PaymentMethod
        data-cy={ticketsSelectors.PAYMENT_METHOD_VOUCHER}
        onChange={(value) => updateTicketPayment({
          method: PAYMENT_METHOD_VOUCHER,
          concept: value
        })}
        onEnter={() => null}
        placeholder={intl.formatMessage(messages.ticket)}
        disabled={isPaymentMethodDisabled}
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
