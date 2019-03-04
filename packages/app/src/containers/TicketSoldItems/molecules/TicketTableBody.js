/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { formatDescription } from 'utils/ticket';
import TicketTableBodyContainer from '../atoms/TicketTableBodyContainer';
import HeightAdapterContainer from '../atoms/HeightAdapterContainer';
import TicketTableRowContainer from '../atoms/TicketTableRowContainer';
import TicketTableField from './TicketTableField';
import TicketTableAmountField from './TicketTableAmountField';
import TicketTableButton from './TicketTableButton';

export class TicketTableBody extends React.Component {

  getTicketItemAction(item, i) {
    // if returning item
    if (item.amount_return) {
      return <TicketTableButton primary icon="remove-close" onClick={() => this.props.undoReturnStockFromTicket(item, i)} />;
    }
    // if new ticket item
    if (item.added) {
      return <TicketTableButton primary icon="remove-close" onClick={() => this.props.removeStockFromTicket(item, i)} />;
    }
    // otherwise (existing item to be returned)
    return <TicketTableButton primary icon="arrow-left" onClick={() => this.props.returnStockFromTicket(item, i)} />;
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
              <TicketTableAmountField
                placeholder={item.amount || '0'}
                value={
                  this.props.tmp[item.reference] && this.props.tmp[item.reference].amount
                    ? this.props.tmp[item.reference].amount
                    : ''
                }
                onChange={(amount) =>
                  this.props.updateTmpData(item.reference, {
                    amount: parseInt(amount, 10),
                  })
                }
                onBlur={(e) => {
                  if (this.props.tmp[item.reference] && this.props.tmp[item.reference].amount) {
                    this.props.updateTicketData(item, {
                      amount: this.props.tmp[item.reference].amount,
                    });
                  }
                }}
              />
              <TicketTableField placeholder={(item.price * item.amount).toFixed(2)} readonly />
              {this.getTicketItemAction(item, i)}
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
