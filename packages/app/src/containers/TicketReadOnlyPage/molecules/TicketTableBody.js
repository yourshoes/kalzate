/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import { formatDescription } from 'utils/ticket';
import TicketTableBodyContainer from '../atoms/TicketTableBodyContainer';
import HeightAdapterContainer from '../atoms/HeightAdapterContainer';
import TicketTableRowContainer from '../atoms/TicketTableRowContainer';
import TicketTableField from './TicketTableField';
import { TICKET_RETURN_STATE, TICKET_SOLD_STATE } from 'config';

export class TicketTableBody extends React.Component {
  getSubtotal(item) {
    if (this.props.ticket.state === TICKET_SOLD_STATE) {
      return (item.price * item.amount).toFixed(2);
    }

    return item.wasAdded
      ? (item.price * (item.amount || 0)).toFixed(2)
      : (-item.price * (item.wasReturned || 0)).toFixed(2);
  }

  getReturned(item) {
    if (item.amount_return_prev !== (item.wasReturned || 0)) {
      return `${item.wasReturned || 0} (${item.amount_return_prev})`;
    }
    return `${item.wasReturned || 0}`;
  }

  render() {
    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer>
          {this.props.ticket.items.map((item, i) => (
            <TicketTableRowContainer key={i} even={(i + 1) % 2} highlight={item.amount_return}>
              <TicketTableField placeholder={item.reference} readonly />
              <TicketTableField placeholder={formatDescription(item)} readonly bigger />
              <TicketTableField placeholder={item.price.toFixed(2)} readonly />
              <TicketTableField placeholder={item.amount || 0} readonly />
              {this.props.ticket.state === TICKET_RETURN_STATE && (
                <TicketTableField placeholder={this.getReturned(item)} readonly />
              )}
              <TicketTableField placeholder={this.getSubtotal(item)} readonly />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
