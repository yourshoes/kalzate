

import React, { PropTypes, Fragment } from 'react';
import Octicon from 'react-octicon';
import {
  PAYMENT_METHOD_VOUCHER,
} from 'config';
import messages from '../messages';
import { tickets as ticketsSelectors } from '@kalzate/cy';
import PaymentMethod from '@kalzate/ui';

export class Voucher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {

    const {
      voucherPaymentAmount,
      voucherPaymentConcept,
      updateTicketPayment,
      totalAmount,
      intl } = this.props;

    const isPaymentMethodDisabled = totalAmount <= 0;

    return (
      <div>
        <PaymentMethod
          data-cy={ticketsSelectors.PAYMENT_METHOD_VOUCHER}
          pattern="id"
          visible={Boolean(voucherPaymentAmount) === false}
          loading={this.state.loading}
          onChange={(value) => updateTicketPayment({
            method: PAYMENT_METHOD_VOUCHER,
            concept: value
          })}
          onEnter={() => {
            this.setState({ loading: true });
            // redeemVoucher(voucherPaymentConcept);
          }}
          placeholder={intl.formatMessage(messages.ticket)}
          disabled={isPaymentMethodDisabled}
          value={voucherPaymentConcept}
          icon={<Octicon mega name="gift" verticalAlign='middle' />} />
        <PaymentMethod
          data-cy={ticketsSelectors.PAYMENT_METHOD_VOUCHER}
          visible={Boolean(voucherPaymentAmount) === true}
          placeholder={intl.formatMessage(messages.ticket)}
          readonly={true}
          value={voucherPaymentAmount}
          icon={<Octicon mega name="gift" verticalAlign='middle' />} />
      </div>
    );
  }
}

Voucher.propTypes = {
  loading: PropTypes.bool
};

export default Voucher;