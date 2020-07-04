/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { getSubtotal, formatDescription, formatDecimalPlaces } from 'utils/ticket';
import TicketTableBodyContainer from '../atoms/TicketTableBodyContainer';
import HeightAdapterContainer from '../atoms/HeightAdapterContainer';
import TicketTableRowContainer from '../atoms/TicketTableRowContainer';
import TicketTableField from './TicketTableField';
import TicketTableAmountField from './TicketTableAmountField';
import TicketTableButton from './TicketTableButton';
import Section5 from '../atoms/Section5';
import TicketButton from '../atoms/TicketButton';
import { tickets as ticketsSelectors } from '@kalzate/cy';


export class TicketTableBody extends React.Component {

  getTicketItemAddedAmount(stock, operation) {

    if (operation.removedAmount > 0) {
      return (<TicketTableField placeholder="0" readonly />);
    }

    if (operation.isNewEntry) {

      return (
        <TicketTableAmountField
          placeholder={operation.addedAmount || '0'}
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
          onBlur={(e) => {
            if (this.props.tmp[stock.reference] && this.props.tmp[stock.reference].amount) {
              this.props.createAddOperation(stock, {
                amount: this.props.tmp[stock.reference].amount,
              });
            }
          }}
        />
      );
    }

    return (
      <TicketTableAmountField
        placeholder={`${operation.addedAmount}` || '0'}
        value={
          this.props.tmp[stock.reference] && Number.isFinite(this.props.tmp[stock.reference].amount)
            ? this.props.tmp[stock.reference].amount
            : ''
        }
        onChange={(amount) =>
          this.props.updateTmpData(stock.reference, {
            amount: parseInt(amount, 10),
          })
        }
        onBlur={(e) => {
          if (this.props.tmp[stock.reference] && Number.isFinite(this.props.tmp[stock.reference].amount)) {
            this.props.createAddOperation(stock, { amount: this.props.tmp[stock.reference].amount });
          }
        }}
      />
    )

  }

  getTicketItemRemovedAmount(stock, operation) {

    if (operation.addedAmount > 0 || operation.isNewEntry || (operation.previousAddedAmount - operation.previousRemovedAmount) === 0) {
      return (<TicketTableField placeholder="0" readonly />);
    }


    if (operation.previousRemovedAmount > 0) {
      return (
        <TicketTableAmountField
          placeholder={operation.removedAmount}
          info={<FormattedMessage {...messages.removedAmountInfoTooltip}
            values={{
              returnAmount: operation.previousAddedAmount - operation.previousRemovedAmount,
              previousAddedAmount: operation.previousAddedAmount,
              previousRemovedAmount: operation.previousRemovedAmount
            }} />}
          readonly
        />
      )
    }

    return (
      <TicketTableAmountField
        placeholder={operation.removedAmount}
        readonly
        info={<FormattedMessage {...messages.amountInfoTooltip}
          values={{
            returnAmount: operation.previousAddedAmount - operation.previousRemovedAmount,
          }} />}
      />
    )

  }

  getTicketItemSubtotalAmount(stock, operation) {

    if (operation.addedAmount > 0) {
      return (<TicketTableField
        placeholder={formatDecimalPlaces(getSubtotal({ stock, ...operation, amount: operation.addedAmount }))}
        readonly
      />)
    }

    return (<TicketTableField
      placeholder={formatDecimalPlaces(getSubtotal({ stock, ...operation, amount: operation.removedAmount }))}
      readonly
    />)

  }

  getTicketItemAction(stock, operation) {

    if (operation.isNewEntry || operation.addedAmount) {
      return (
        <TicketTableButton
          primary
          icon="remove-close"
          onClick={() => this.props.createAddOperation(stock, { amount: 0 })}
        />
      );
    }

    return (
      <Section5>
        <TicketButton
          data-cy={ticketsSelectors.INCREASE_RETURN_ITEM_BUTTON}
          primary
          disabled={operation.addedAmount > 0 || operation.removedAmount === operation.previousAddedAmount - operation.previousRemovedAmount}
          width={50}
          icon="arrow-up"
          onClick={() =>
            this.props.createRemoveOperation(
              stock,
              { amount: operation.removedAmount + 1 },
            )
          }
        />
        <TicketButton
          primary
          disabled={operation.addedAmount > 0 || operation.removedAmount === 0}
          width={50}
          icon="arrow-down"
          onClick={() =>
            this.props.createRemoveOperation(
              stock,
              {
                amount: operation.removedAmount - 1,
              })
          }
        />
      </Section5>
    );
  }

  getTicketItemDiscount(stock, operation) {

    if (operation.isNewEntry || operation.addedAmount > 0) {
      return (
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
                amount: operation.addedAmount,
                discountValue: this.props.tmp[stock.reference].discountValue,
                discountType: 'fixed'
              });
            }
          }}
        />
      );
    }

    return <TicketTableField placeholder={operation.discountValue || '0'} readonly />

  }


  render() {

    console.log('1111....', this.props.ticketOperations);

    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer data-cy={ticketsSelectors.RETURN_ITEMS_LIST}>
          {this.props.ticketOperations.map(({ stock, ...operation }, i) => (
            <TicketTableRowContainer
              data-cy={ticketsSelectors.RETURN_ITEM_ROW}
              key={i}
              even={(i + 1) % 2}
              highlight={
                (operation.removedAmount > 0) ||
                (operation.addedAmount > 0)
              }
            >
              <TicketTableField placeholder={stock.reference} readonly />
              <TicketTableField placeholder={formatDescription(stock)} readonly bigger />
              <TicketTableField placeholder={formatDecimalPlaces(stock.price)} readonly />
              {this.getTicketItemAddedAmount(stock, operation)}
              {this.getTicketItemRemovedAmount(stock, operation)}
              {this.getTicketItemDiscount(stock, operation)}
              {this.getTicketItemSubtotalAmount(stock, operation)}
              {this.getTicketItemAction(stock, operation)}
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
