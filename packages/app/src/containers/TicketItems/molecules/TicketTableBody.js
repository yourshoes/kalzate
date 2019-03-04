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

  render() {
    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer>
          {this.props.ticket.items.map((item, i) => (
            <TicketTableRowContainer key={i} even={(i + 1) % 2}>
              <TicketTableField placeholder={item.reference} readonly />
              <TicketTableField placeholder={formatDescription(item)} readonly bigger />
              <TicketTableField placeholder={item.price.toFixed(2)} readonly />
              <TicketTableAmountField
                placeholder={item.amount || '1'}
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
              <TicketTableAmountField
                placeholder={item.discount || '0'}
                value={
                  this.props.tmp[item.reference] && Number.isFinite(this.props.tmp[item.reference].discount)
                    ? this.props.tmp[item.reference].discount
                    : ''
                }
                onChange={(discount) =>
                  this.props.updateTmpData(item.reference, {
                    discount: parseInt(discount, 10),
                  })
                }
                onBlur={(e) => {
                  if (this.props.tmp[item.reference] && Number.isFinite(this.props.tmp[item.reference].discount)) {
                    this.props.updateTicketData(item, {
                      discount: this.props.tmp[item.reference].discount,
                    });
                  }
                }}
              />
              <TicketTableField placeholder={((item.price * item.amount) - (item.discount || 0)).toFixed(2)} readonly />
              <TicketTableButton primary icon="remove-close" onClick={() => this.props.removeStockFromTicket(item, i)} />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
