/*
 *
 * TicketPayments
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { PaymentMethods } from './molecules/PaymentMethods';
import { updateTicketPayment, addVoucherPaymentAmount, removeVoucherPaymentAmount } from 'actions/tickets';
import {
  ticketTotalAmount,
  ticketRemainingAmount,
  ticketCreditCardPaymentAmount,
  ticketCashPaymentAmount,
  ticketVoucherPaymentAmount,
  ticketVoucherPaymentConcept
} from 'selectors/tickets';

export class TicketPayments extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PaymentMethods
        {...this.props}
      />
    );
  }
}

TicketPayments.propTypes = {
  method: PropTypes.string,
  updateTicketPayment: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateTicketPayment: (payment) => dispatch(updateTicketPayment(payment)),
    addVoucherPaymentAmount: (voucherId) => dispatch(addVoucherPaymentAmount(voucherId)),
    removeVoucherPaymentAmount: () => dispatch(removeVoucherPaymentAmount()),
  };
}

const mapStateToProps = createStructuredSelector({
  totalAmount: ticketTotalAmount,
  remainingAmount: ticketRemainingAmount,
  creditCardPaymentAmount: ticketCreditCardPaymentAmount,
  cashPaymentAmount: ticketCashPaymentAmount,
  voucherPaymentAmount: ticketVoucherPaymentAmount,
  voucherPaymentConcept: ticketVoucherPaymentConcept
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TicketPayments));
