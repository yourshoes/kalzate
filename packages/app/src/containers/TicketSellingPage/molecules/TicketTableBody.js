/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { getSubtotal, formatDescription, formatDecimalPlaces } from 'utils/ticket';
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
          {this.props.ticketOperations.map(({ stock, ...operation }, i) => (
            <TicketTableRowContainer key={i} even={(i + 1) % 2}>
              <TicketTableField placeholder={stock.reference} readonly />
              <TicketTableField placeholder={formatDescription(stock)} readonly bigger />
              <TicketTableField placeholder={formatDecimalPlaces(stock.price)} readonly />
              <TicketTableAmountField
                placeholder={operation.amount}
                value={
                  this.props.tmp[stock.reference] && this.props.tmp[stock.reference].amount
                    ? this.props.tmp[stock.reference].amount
                    : ''
                }
                onChange={(amount) =>
                  this.props.updateTmpData(stock.reference, {
                    amount: parseInt(amount, 10),
                  })
                }
                onBlur={() => {
                  if (this.props.tmp[stock.reference] && this.props.tmp[stock.reference].amount) {
                    this.props.createAddOperation(stock, {
                      amount: this.props.tmp[stock.reference].amount,
                    });
                  }
                }}
              />
              <TicketTableAmountField
                placeholder={operation.discountValue || '0'}
                value={
                  this.props.tmp[stock.reference] && Number.isFinite(this.props.tmp[stock.reference].discountValue)
                    ? this.props.tmp[stock.reference].discountValue
                    : ''
                }
                onChange={(discountValue) =>
                  this.props.updateTmpData(stock.reference, {
                    discountValue: parseInt(discountValue, 10),
                  })
                }
                onBlur={() => {
                  if (this.props.tmp[stock.reference] && Number.isFinite(this.props.tmp[stock.reference].discountValue)) {
                    this.props.createAddOperation(stock, {
                      amount: operation.amount,
                      discountValue: this.props.tmp[stock.reference].discountValue,
                      discountType: 'fixed'
                    });
                  }
                }}
              />
              <TicketTableField placeholder={formatDecimalPlaces(getSubtotal({ stock, ...operation }))} readonly />
              <TicketTableButton primary icon="remove-close" onClick={() => this.props.createAddOperation(stock, { amount: 0 })} />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
