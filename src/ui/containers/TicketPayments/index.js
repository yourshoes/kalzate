/*
 *
 * TicketPayments
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectTicketPayments from './selectors';
import { PaymentMethods } from './molecules/PaymentMethods';
import { setMethod } from './actions';

export class TicketPayments extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PaymentMethods
        method={this.props.ticketPayments.get('method')}
        {...this.props}
      />
    );
  }
}

TicketPayments.propTypes = {
  ticketPayments: PropTypes.object.isRequired,
  setMethod: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    setMethod: (method) => dispatch(setMethod(method)),
  };
}

const mapStateToProps = createStructuredSelector({
  ticketPayments: makeSelectTicketPayments(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketPayments);
