/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import TicketTableRowContainer from '../atoms/TicketTableRowContainer';
import TicketTableField from './TicketTableField';
import TicketTableButton from './TicketTableButton';
import messages from '../messages';

export class TicketTableHeader extends React.Component {
  render() {
    return (
      <TicketTableRowContainer content>
        <TicketTableField
          placeholder={this.props.intl.formatMessage(messages.reference)}
          readonly
        />
        <TicketTableField
          placeholder={this.props.intl.formatMessage(messages.description)}
          readonly
          bigger
        />
        <TicketTableField placeholder={this.props.intl.formatMessage(messages.price)} readonly />
        <TicketTableField placeholder={this.props.intl.formatMessage(messages.amount)} readonly />
        <TicketTableField placeholder={this.props.intl.formatMessage(messages.return)} readonly />
        <TicketTableField placeholder={this.props.intl.formatMessage(messages.subtotal)} readonly />
        <TicketTableButton primary icon="remove-close" onClick={() => this.props.removeTicket()} />
        {/* This remove-close button in the table header removes the current ticket state to start again with a new ticket, otherwise it has to be clicked on save ticket. cancel ticket or check out to start with a new ticket. Going back and forth (i.e. from ticket screen to home screen and again to ticket screen again) does not removes current ticket state but preserves it as a draft */}
      </TicketTableRowContainer>
    );
  }
}

TicketTableHeader.propTypes = {};

export default TicketTableHeader;
