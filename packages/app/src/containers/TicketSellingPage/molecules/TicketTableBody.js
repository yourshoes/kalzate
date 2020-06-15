/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { formatDescription } from 'utils/ticket';
import { calculateSubtotal } from 'selectors/tickets';
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
          {this.props.ticket.operations.map((operation, i) => (
            <TicketTableRowContainer key={i} even={(i + 1) % 2}>
              <TicketTableField placeholder={operation.reference} readonly />
              <TicketTableField placeholder={formatDescription(operation)} readonly bigger />
              <TicketTableField placeholder={operation.price.toFixed(2)} readonly />
              <TicketTableAmountField
                placeholder={operation.amount || '1'}
                value={
                  this.props.tmp[operation.reference] && this.props.tmp[operation.reference].amount
                    ? this.props.tmp[operation.reference].amount
                    : ''
                }
                onChange={(amount) =>
                  this.props.updateTmpData(operation.reference, {
                    amount: parseInt(amount, 10),
                  })
                }
                onBlur={(e) => {
                  if (this.props.tmp[operation.reference] && this.props.tmp[operation.reference].amount) {
                    this.props.updateTicketData(operation, {
                      amount: this.props.tmp[operation.reference].amount,
                    });
                  }
                }}
              />
              <TicketTableAmountField
                placeholder={operation.discount || '0'}
                value={
                  this.props.tmp[operation.reference] && Number.isFinite(this.props.tmp[operation.reference].discount)
                    ? this.props.tmp[operation.reference].discount
                    : ''
                }
                onChange={(discount) =>
                  this.props.updateTmpData(operation.reference, {
                    discount: parseInt(discount, 10),
                  })
                }
                onBlur={(e) => {
                  if (this.props.tmp[operation.reference] && Number.isFinite(this.props.tmp[operation.reference].discount)) {
                    this.props.updateTicketData(operation, {
                      discount: this.props.tmp[operation.reference].discount,
                    });
                  }
                }}
              />
              <TicketTableField placeholder={calculateSubtotal(operation).toFixed(2)} readonly />
              <TicketTableButton primary icon="remove-close" onClick={() => this.props.removeStockFromTicket(operation, i)} />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
