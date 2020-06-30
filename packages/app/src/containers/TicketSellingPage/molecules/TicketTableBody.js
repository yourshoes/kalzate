/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { formatDescription } from 'utils/ticket';
import { getSubtotal, formatDecimalPlaces } from 'utils/ticket';
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
          {this.props.ticketOperations.map((operation, i) => (
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
                onBlur={() => {
                  if (this.props.tmp[operation.reference] && this.props.tmp[operation.reference].amount) {
                    this.props.updateTicketOperation(operation.reference, {
                      amount: this.props.tmp[operation.reference].amount,
                    });
                  }
                }}
              />
              <TicketTableAmountField
                placeholder={operation.discountValue || '0'}
                value={
                  this.props.tmp[operation.reference] && Number.isFinite(this.props.tmp[operation.reference].discountValue)
                    ? this.props.tmp[operation.reference].discountValue
                    : ''
                }
                onChange={(discountValue) =>
                  this.props.updateTmpData(operation.reference, {
                    discountValue: parseInt(discountValue, 10),
                  })
                }
                onBlur={() => {
                  if (this.props.tmp[operation.reference] && Number.isFinite(this.props.tmp[operation.reference].discountValue)) {
                    this.props.updateTicketOperation(operation.reference, {
                      discountValue: this.props.tmp[operation.reference].discountValue,
                    });
                  }
                }}
              />
              <TicketTableField placeholder={formatDecimalPlaces(getSubtotal(operation))} readonly />
              <TicketTableButton primary icon="remove-close" onClick={() => this.props.removeStockFromTicket(i)} />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
