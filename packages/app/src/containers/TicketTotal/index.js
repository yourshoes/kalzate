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
  makeSelectMethod,
  makeSelectCreationDate,
  makeSelectState,
} from './selectors';
import { setTicketGivenAmount, increaseGivenAmount, decreaseGivenAmount } from './actions';
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
  method: makeSelectMethod(),
  state: makeSelectState(),
  created_at: makeSelectCreationDate(),
  totalAmount: makeSelectTotalAmount(),
  givenAmount: makeSelectGivenAmount(),
  returnAmount: makeSelectReturnAmount(),
  currency: makeSelectCurrency(),
});

function mapDispatchToProps(dispatch) {
  return {
    setTicketGivenAmount: (amount) => dispatch(setTicketGivenAmount(amount)),
    increaseGivenAmount: (by) => dispatch(increaseGivenAmount(by)),
    decreaseGivenAmount: (by) => dispatch(decreaseGivenAmount(by)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketTotal);
