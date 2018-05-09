/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import SearchContainer from '../atoms/SearchContainer';
import SearchInput from '../atoms/SearchInput';

export class TicketSearchField extends React.Component {

  render() {
    return (
      <SearchContainer>
        <Octicon name="search" />
        <SearchInput type="text" placeholder="Ticket ID" />
      </SearchContainer>
    );
  }
}

TicketSearchField.propTypes = {};

export default TicketSearchField;
