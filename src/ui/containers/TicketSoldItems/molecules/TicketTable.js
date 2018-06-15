/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import TicketTableContainer from '../atoms/TicketTableContainer';
import TicketTableHeader from './TicketTableHeader';
import TicketTableBody from './TicketTableBody';

export class TicketTable extends React.Component {

  render() {
    return (
      <TicketTableContainer>
        <TicketTableHeader {...this.props} />
        <TicketTableBody {...this.props} />
      </TicketTableContainer>
    );
  }
}

TicketTable.propTypes = {};

export default TicketTable;
