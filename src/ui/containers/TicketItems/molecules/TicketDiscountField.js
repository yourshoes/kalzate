/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import SearchContainer from '../atoms/SearchContainer';
import SearchInput from '../atoms/SearchInput';

export class TicketDiscountField extends React.Component {

  render() {
    return (
      <SearchContainer>
        <Octicon name="triangle-down" />
        <SearchInput type="text" placeholder="Discount %" />
      </SearchContainer>
    );
  }
}

TicketDiscountField.propTypes = {};

export default TicketDiscountField;
