/**
 *
 * BlogPost
 *
 */

import React from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectTicketDomain, selectSettingsData, makeSelectTicketReadOnly } from './selectors';
import { setTicketGivenAmount, increaseGivenAmount, decreaseGivenAmount } from './actions';
import PaymentTicket from './molecules/PaymentTicket';

function TicketTotal(props) {
  return <PaymentTicket {...props} />;
}

TicketTotal.propTypes = {};

const mapStateToProps = createStructuredSelector({
  ticket: selectTicketDomain(),
  isReadOnly: makeSelectTicketReadOnly(),
  settings: selectSettingsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    setTicketGivenAmount: (amount) => dispatch(setTicketGivenAmount(amount)),
    increaseGivenAmount: (by) => dispatch(increaseGivenAmount(by)),
    decreaseGivenAmount: (by) => dispatch(decreaseGivenAmount(by)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketTotal);
