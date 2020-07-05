

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

  componentWillReceiveProps({ voucherPaymentAmount, ticketVoucherPaymentError }) {
    if (voucherPaymentAmount || ticketVoucherPaymentError) this.setState({ loading: false });
  }

  render() {

    const {
      voucherPaymentAmount,
      voucherPaymentConcept,
      updateTicketPayment,
      addVoucherPaymentAmount,
      removeVoucherPaymentAmount,
      totalAmount,
      isTicketReadOnly,
      intl } = this.props;

    const isPaymentMethodDisabled = totalAmount <= 0 || isTicketReadOnly;

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
            addVoucherPaymentAmount(voucherPaymentConcept);
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
          icon={<Octicon mega name="x" verticalAlign='middle' style={{ cursor: 'pointer' }} onClick={() => {
            this.setState({ loading: false });
            removeVoucherPaymentAmount();
          }} />} />
      </div>
    );
  }
}

Voucher.propTypes = {
  loading: PropTypes.bool
};

export default Voucher;