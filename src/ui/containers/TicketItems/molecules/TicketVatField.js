/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import SearchContainer from '../atoms/SearchContainer';
import SearchInput from '../atoms/SearchInput';

export class TicketVatField extends React.Component {

  render() {
    return (
      <SearchContainer>
        <Octicon name="triangle-up" />
        <SearchInput type="text" placeholder="VAT %" />
      </SearchContainer>
    );
  }
}

TicketVatField.propTypes = {};

export default TicketVatField;
