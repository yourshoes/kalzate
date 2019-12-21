/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { PAYMENT_METHOD_CASH, TICKET_SOLD_STATE } from 'config';
import { isRealNumeric } from 'utils/helper';
import PaymentSection from '../atoms/PaymentSection';
import GivenAmount from '../atoms/GivenAmount';
import { tickets as ticketsSelectors } from '@kalzate/cy';

export class PaymentGiven extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: props.method !== PAYMENT_METHOD_CASH ? `${props.totalAmount}` : '0.00',
      value: props.givenAmount || '0.00',
      cursorStart: 0,
      cursorEnd: 0,
    };
    this.increaseShiftValues = [10, 0.1];
    this.increaseNoShiftValues = [1, 0.01];
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.givenAmount);
    this.setState({ value: `${nextProps.givenAmount}` });
  }

  componentDidUpdate(prevProps) {
    return this.updateCursor(this.state.cursorStart, this.state.cursorEnd);
  }

  updateCursor(start, end) {
    if (!this.input) {
      return;
    }

    this.input.setSelectionRange(start, end);
  }

  setValue(value, event) {
    if (value && !value.includes('.') && this.state.value.includes('.')) {
      return this.setState(
        { cursorStart: event.target.selectionStart - 1, cursorEnd: event.target.selectionEnd - 1 },
        () =>
          this.props.setTicketGivenAmount(
            `${value.substr(0, this.state.value.indexOf('.') - 1)}.${value.substr(
              this.state.value.indexOf('.') + 1
            )}`
          )
      );
    }

    if (value && value.includes(',.')) {
      return this.setState(
        { cursorStart: event.target.selectionStart, cursorEnd: event.target.selectionEnd },
        () => this.props.setTicketGivenAmount(value.replace(',.', '.'))
      );
    }

    if (value && !isRealNumeric(value)) {
      return this.setState(
        { cursorStart: event.target.selectionStart - 1, cursorEnd: event.target.selectionEnd - 1 },
        () => this.props.setTicketGivenAmount(value)
      );
    }

    this.setState(
      { cursorStart: event.target.selectionStart, cursorEnd: event.target.selectionEnd },
      () => this.props.setTicketGivenAmount(value)
    );
  }

  onBlur() {
    if (!this.state.value) {
      return this.setState({ value: '0.00' });
    }
    if (this.props.method === PAYMENT_METHOD_CASH) {
      return this.setState({ value: `${this.props.givenAmount}` });
    }
  }

  onClick(event) {
    if (event.target.selectionStart >= this.state.value.length) {
      return this.setState({
        cursorStart: this.state.value.length,
        cursorEnd: this.state.value.length,
      });
    }
    this.setState({
      cursorStart: event.target.selectionStart,
      cursorEnd: event.target.selectionEnd,
    });
  }

  onDoubleClick() {
    if (this.props.method === PAYMENT_METHOD_CASH) {
      this.setState({ value: '', cursorStart: 0, cursorEnd: 0 });
    }
  }

  onChange(event) {
    const value = event.target.value.replace(` ${this.props.currency}`, '').trim();
    return this.setValue(value, event);
  }

  getByGivenAmountPosition(target, isShift) {
    const increaseValues = isShift ? this.increaseShiftValues : this.increaseNoShiftValues;
    return target.selectionStart <= this.state.value.indexOf('.')
      ? increaseValues[0]
      : increaseValues[1];
  }

  stopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  render() {
    return (
      <PaymentSection>
        <GivenAmount
          data-cy={ticketsSelectors.PAYMENT_INPUT}
          type="text"
          innerRef={(input) => (this.input = input)}
          disabled={this.props.method !== PAYMENT_METHOD_CASH}
          onClick={(e) => this.onClick(e)}
          onBlur={() => this.onBlur()}
          onDoubleClick={(event) => this.onDoubleClick(event)}
          onKeyDown={(event) => {
            const { target, key } = event;
            const isShift = !!event.shiftKey;
            switch (key) {
              case 'Enter':
                this.setState({ value: this.props.totalAmount, cursorStart: 0, cursorEnd: 0 });
                return this.stopPropagation(event);
              case 'ArrowUp':
                this.setState(
                  { cursorStart: target.selectionStart, cursorEnd: target.selectionEnd },
                  () =>
                    this.props.increaseGivenAmount(this.getByGivenAmountPosition(target, isShift))
                );
                return this.stopPropagation(event);
              case 'ArrowDown':
                this.setState(
                  { cursorStart: target.selectionStart, cursorEnd: target.selectionEnd },
                  () =>
                    this.props.decreaseGivenAmount(this.getByGivenAmountPosition(target, isShift))
                );
                return this.stopPropagation(event);
              case 'ArrowRight':
                if (target.selectionStart >= this.state.value.length) {
                  this.setState({
                    cursorStart: target.selectionStart,
                    cursorEnd: target.selectionEnd,
                  });
                  return this.stopPropagation(event);
                }
                break;
              case 'Escape':
                this.setState({ value: '', cursorStart: 0, cursorEnd: 0 });

                return this.stopPropagation(event);
              default:
            }
            return true;
          }}
          value={`${this.state.value} ${this.props.currency}`}
          onChange={(event) => this.onChange(event)}
        />
      </PaymentSection>
    );
  }
}

PaymentGiven.propTypes = {};

export default PaymentGiven;
