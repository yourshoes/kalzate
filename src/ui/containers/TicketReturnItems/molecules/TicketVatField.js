/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import SearchContainer from '../atoms/SearchContainer';
import SearchInput from '../atoms/SearchInput';
import TicketSpan from '../atoms/TicketSpan';

const isRealNumeric = function (input) {
  return /^[1-9][0-9]{0,1}$/.test(input);
};
export class TicketVatField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: this.toPercentage(props.tax) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: this.toPercentage(nextProps.tax) });
  }

  toPercentage(value) {
    return (value * 100).toFixed();
  }

  render() {
    return (
      <SearchContainer>
        <Octicon name="triangle-up" />
        <TicketSpan> VAT</TicketSpan>
        <SearchInput
          type="text"
          onFocus={({ target }) => target.value = target.value.replace('%', '').trim()}
          value={this.state.value > 0 ? this.state.value : ''}
          onChange={({ target }) => {
            this.props.updateTax(isRealNumeric(target.value) ? target.value : (target.value === '' ? 0 : this.state.value));
          }}
          placeholder={'%'}
          onBlur={({ target }) => target.value = this.state.value > 0 ? `${target.value} %` : ''}
        />
      </SearchContainer>
    );
  }
}

TicketVatField.propTypes = {};

export default TicketVatField;