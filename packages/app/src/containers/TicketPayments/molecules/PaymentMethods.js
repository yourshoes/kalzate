/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import { FormattedMessage } from 'react-intl';
import {
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_PHONE,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_TICKET,
} from 'config';
import PaymentSectionContainer from '../atoms/PaymentSectionContainer';
import PaymentMethodsSection from '../atoms/PaymentMethodsSection';
import PaymentMethodsItem from '../atoms/PaymentMethodsItem';
import PaymentMethodsItemTitle from '../atoms/PaymentMethodsItemTitle';
import messages from '../messages';
import { tickets as ticketsSelectors } from '@kalzate/cy';

export function PaymentMethods({ method, setMethod }) {
  return (
    <PaymentSectionContainer>
      <PaymentMethodsSection>
        <PaymentMethodsItem
          data-cy={ticketsSelectors.PAYMENT_METHOD_CREDIT_CARD}
          onClick={() => setMethod(PAYMENT_METHOD_CREDIT_CARD)}
          selected={method === PAYMENT_METHOD_CREDIT_CARD}
        >
          <Octicon mega name="credit-card" />{' '}
          <PaymentMethodsItemTitle>
            <FormattedMessage {...messages.creditcard} />
          </PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
      <PaymentMethodsSection>
        <PaymentMethodsItem
          data-cy={ticketsSelectors.PAYMENT_METHOD_CASH}
          onClick={() => setMethod(PAYMENT_METHOD_CASH)}
          selected={method === PAYMENT_METHOD_CASH}
        >
          <Octicon mega name="credit-card" />{' '}
          <PaymentMethodsItemTitle>
            <FormattedMessage {...messages.cash} />
          </PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
      <PaymentMethodsSection>
        <PaymentMethodsItem
          data-cy={ticketsSelectors.PAYMENT_METHOD_VOUCHER}
          onClick={() => setMethod(PAYMENT_METHOD_TICKET)}
          selected={method === PAYMENT_METHOD_TICKET}
        >
          <Octicon mega name="gift" />{' '}
          <PaymentMethodsItemTitle>
            <FormattedMessage {...messages.ticket} />
          </PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
      <PaymentMethodsSection>
        <PaymentMethodsItem
          data-cy={ticketsSelectors.PAYMENT_METHOD_PHONE}
          onClick={() => setMethod(PAYMENT_METHOD_PHONE)}
          selected={method === PAYMENT_METHOD_PHONE}
        >
          <Octicon mega name="device-mobile" />{' '}
          <PaymentMethodsItemTitle>
            <FormattedMessage {...messages.phone} />
          </PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
    </PaymentSectionContainer>
  );
}

PaymentMethods.propTypes = {
  method: PropTypes.string,
  setMethod: PropTypes.func.isRequired,
};

export default PaymentMethods;
