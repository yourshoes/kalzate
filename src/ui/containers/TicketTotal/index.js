/**
*
* BlogPost
*
*/

import React from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectTotalAmount,
  makeSelectGivenAmount,
  makeSelectReturnAmount,
  makeSelectCurrency,
} from './selectors';
import { setTicketGivenAmount } from './actions';
import PaymentSummary from './molecules/PaymentSummary';

function TicketTotal(props) {
  return (
    <PaymentSummary {...props} />
  );
}

TicketTotal.propTypes = {
  totalAmount: React.PropTypes.string,
  givenAmount: React.PropTypes.string,
  returnAmount: React.PropTypes.string,
  currency: React.PropTypes.string,
  setTicketGivenAmount: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  totalAmount: makeSelectTotalAmount(),
  givenAmount: makeSelectGivenAmount(),
  returnAmount: makeSelectReturnAmount(),
  currency: makeSelectCurrency(),
});

function mapDispatchToProps(dispatch) {
  return {
    setTicketGivenAmount: (amount) => dispatch(setTicketGivenAmount(amount)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketTotal);
