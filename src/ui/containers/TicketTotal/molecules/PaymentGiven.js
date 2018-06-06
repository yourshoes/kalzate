/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { PAYMENT_METHOD_CASH } from 'ui/constants';
import PaymentSection from '../atoms/PaymentSection';
import GivenAmount from '../atoms/GivenAmount';

export class PaymentGiven extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.method !== PAYMENT_METHOD_CASH ? `${props.totalAmount} ${props.currency}` : `0.00 ${props.currency}`,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalAmount <= 0) {
      return this.setState({ value: `0.00 ${nextProps.currency}` });
    }
    if (nextProps.method !== PAYMENT_METHOD_CASH && nextProps.created_at === this.props.created_at) {
      return this.setState({ value: `${nextProps.totalAmount} ${nextProps.currency}` });
    }

    if (nextProps.created_at !== this.props.created_at) {
      console.log(nextProps);
      return this.setState({ value: `${nextProps.givenAmount} ${nextProps.currency}` });
    }
    // return this.setState({ value: `${nextProps.givenAmount} ${nextProps.currency}` });
  }

  setValue(value) {
    if (value) {
      this.setState({ value }, () => this.props.setTicketGivenAmount(value));
    }
  }

  onBlur() {
    if (this.props.method === PAYMENT_METHOD_CASH) {
      this.setState({ value: `${this.props.givenAmount} ${this.props.currency}` });
    }
  }

  render() {
    return (
      <PaymentSection>
        <GivenAmount
          type="text"
          disabled={this.props.method !== PAYMENT_METHOD_CASH}
          onBlur={() =>
            this.onBlur()}
          onDoubleClick={(event) => (this.props.method === PAYMENT_METHOD_CASH ? event.target.value = '' : null)}
          value={this.state.value}
          onChange={(event) => this.setValue(event.target.value)}
        />

      </PaymentSection>
    );
  }
}

PaymentGiven.propTypes = {
};

export default PaymentGiven;
