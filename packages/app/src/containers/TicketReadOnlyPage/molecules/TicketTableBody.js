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
import { TICKET_RETURN_STATE } from 'config';

export class TicketTableBody extends React.Component {
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
                <TicketTableField
                  placeholder={(item.amount_return_prev || 0) - (item.amount_return_prev_last || 0)}
                  readonly
                />
              )}
              <TicketTableField placeholder={(item.price * item.amount).toFixed(2)} readonly />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
