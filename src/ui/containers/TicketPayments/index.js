/*
 *
 * TicketPayments
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectTicketPayments from './selectors';
import messages from './messages';
import { PaymentMethods } from './wrappers';
export class TicketPayments extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return <PaymentMethods />;
  }
}

TicketPayments.propTypes = {};

const mapStateToProps = createStructuredSelector({
  TicketPayments: makeSelectTicketPayments(),
});

export default connect(mapStateToProps)(TicketPayments);
