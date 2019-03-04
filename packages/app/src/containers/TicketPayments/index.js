/*
 *
 * TicketPayments
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMethod } from './selectors';
import { PaymentMethods } from './molecules/PaymentMethods';
import { setMethod } from './actions';

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
  method: makeSelectMethod(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketPayments);
