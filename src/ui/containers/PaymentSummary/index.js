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
  makeSelectTakeAmount,
  makeSelectReturnAmount,
  makeSelectCurrency,
} from 'ui/containers/App/selectors';
import { setTicketTakeAmount } from 'ui/containers/App/actions';
// import messages from './messages';
import {
  PaymentSectionContainer,
  PaymentSection,
  Total,
  Take,
  Returns,
} from './wrappers';

function PaymentSummary(props) {
  return (
    <PaymentSectionContainer>
      <PaymentSection>
        <Total currency={props.currency} amount={props.ticketTotalAmount} />
      </PaymentSection>
      <PaymentSection>
        <Take
          currency={props.currency}
          amount={props.ticketTakeAmount}
          onTakeChange={(takingAmount) => props.setTicketTakeAmount(takingAmount)}
        />
      </PaymentSection>
      <PaymentSection>
        <Returns currency={props.currency} amount={props.ticketReturnAmount} />
      </PaymentSection>
    </PaymentSectionContainer>
  );
}

PaymentSummary.propTypes = {
  ticketTotalAmount: React.PropTypes.string,
  ticketTakeAmount: React.PropTypes.string,
  ticketReturnAmount: React.PropTypes.string,
  currency: React.PropTypes.string,
  setTicketTakeAmount: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ticketTotalAmount: makeSelectTotalAmount(),
  ticketTakeAmount: makeSelectTakeAmount(),
  ticketReturnAmount: makeSelectReturnAmount(),
  currency: makeSelectCurrency(),
});

function mapDispatchToProps(dispatch) {
  return {
    setTicketTakeAmount: (amount) => dispatch(setTicketTakeAmount(amount)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummary);
