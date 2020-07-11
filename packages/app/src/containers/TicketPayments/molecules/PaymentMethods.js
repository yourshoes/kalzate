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
} from 'config';
import PaymentSectionContainer from '../atoms/PaymentSectionContainer';
import Voucher from './Voucher';
import messages from '../messages';
import { tickets as ticketsSelectors } from '@kalzate/cy';
import PaymentMethod from '@kalzate/ui';

export function PaymentMethods(props) {

  const {
    creditCardPaymentAmount,
    cashPaymentAmount,
    updateTicketPayment,
    totalAmount,
    isTicketReadOnly,
    remainingAmount,
    intl } = props;

  const isPaymentMethodDisabled = totalAmount <= 0 || isTicketReadOnly;
  return (
    <PaymentSectionContainer>
      <PaymentMethod
        data-cy={ticketsSelectors.PAYMENT_METHOD_CREDIT_CARD}
        onChange={(value) => updateTicketPayment({
          method: PAYMENT_METHOD_CREDIT_CARD,
          amount: value
        })}
        onEnter={() => {
          const amount = remainingAmount + creditCardPaymentAmount;

          if (amount <= 0) {
            return;
          }

          updateTicketPayment({
            method: PAYMENT_METHOD_CREDIT_CARD,
            amount
          });

        }}
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
        onEnter={
          () => {
            const amount = remainingAmount + cashPaymentAmount;

            if (amount <= 0) {
              return;
            }

            updateTicketPayment({
              method: PAYMENT_METHOD_CASH,
              amount
            });

          }
        }
        placeholder={intl.formatMessage(messages.cash)}
        disabled={isPaymentMethodDisabled}
        value={cashPaymentAmount}
        icon={<Octicon mega name="tag" verticalAlign='middle' />} />
      <Voucher {...props} />
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
