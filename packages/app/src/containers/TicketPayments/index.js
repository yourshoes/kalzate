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
import { setMethod } from './actions';
import {
  ticketTotalAmount,
  ticketCreditCardPaymentAmount,
  ticketCashPaymentAmount,
  ticketVoucherPaymentAmount
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
  setMethod: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    setMethod: (method) => dispatch(setMethod(method)),
  };
}

const mapStateToProps = createStructuredSelector({
  totalAmount: ticketTotalAmount,
  creditCardPaymentAmount: ticketCreditCardPaymentAmount,
  cashPaymentAmount: ticketCashPaymentAmount,
  voucherPaymentAmount: ticketVoucherPaymentAmount
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TicketPayments));
