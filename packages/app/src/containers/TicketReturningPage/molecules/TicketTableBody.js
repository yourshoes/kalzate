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

  getTicketItemAddedAmount(item, i) {

    if (item.removedAmount > 0) {
      return (<TicketTableField placeholder="0" readonly />);
    }

    if (item.isNewEntry) {

      return (
        <TicketTableAmountField
          placeholder={item.addedAmount || '0'}
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
              this.props.updateTicketOperation(item.reference, {
                amount: this.props.tmp[item.reference].amount,
              });
            }
          }}
        />
      );
    }

    return (
      <TicketTableAmountField
        placeholder={`${item.addedAmount}` || '0'}
        value={
          this.props.tmp[item.reference] && Number.isFinite(this.props.tmp[item.reference].amount)
            ? this.props.tmp[item.reference].amount
            : ''
        }
        onChange={(amount) =>
          this.props.updateTmpData(item.reference, {
            amount: parseInt(amount, 10),
          })
        }
        onBlur={(e) => {
          if (this.props.tmp[item.reference] && Number.isFinite(this.props.tmp[item.reference].amount)) {
            this.props.addStockToTicket({ ...item, amount: this.props.tmp[item.reference].amount }, {
              incremental: false,
            });
          }
        }}
      />
    )

  }

  getTicketItemRemovedAmount(item, i) {

    if (item.addedAmount > 0 || item.isNewEntry || (item.previousAddedAmount - item.previousRemovedAmount) === 0) {
      return (<TicketTableField placeholder="0" readonly />);
    }


    if (item.previousRemovedAmount > 0) {
      return (
        <TicketTableAmountField
          placeholder={item.removedAmount}
          info={<FormattedMessage {...messages.removedAmountInfoTooltip}
            values={{
              returnAmount: item.previousAddedAmount - item.previousRemovedAmount,
              previousAddedAmount: item.previousAddedAmount,
              previousRemovedAmount: item.previousRemovedAmount
            }} />}
          readonly
        />
      )
    }

    return (
      <TicketTableAmountField
        placeholder={item.removedAmount}
        readonly
        info={<FormattedMessage {...messages.amountInfoTooltip}
          values={{
            returnAmount: item.previousAddedAmount - item.previousRemovedAmount,
          }} />}
      />
    )

  }

  getTicketItemSubtotalAmount(item, i) {

    if (item.addedAmount > 0) {
      return (<TicketTableField
        placeholder={formatDecimalPlaces(getSubtotal({ ...item, amount: item.addedAmount }))}
        readonly
      />)
    }

    return (<TicketTableField
      placeholder={formatDecimalPlaces(getSubtotal({ ...item, operation: 'return', amount: item.removedAmount }))}
      readonly
    />)

  }

  getTicketItemAction(item, i) {

    if (item.isNewEntry || item.addedAmount) {
      return (
        <TicketTableButton
          primary
          icon="remove-close"
          onClick={() => this.props.removeStockFromTicket(item.reference)}
        />
      );
    }

    return (
      <Section5>
        <TicketButton
          data-cy={ticketsSelectors.INCREASE_RETURN_ITEM_BUTTON}
          primary
          disabled={item.addedAmount > 0 || item.removedAmount === item.previousAddedAmount - item.previousRemovedAmount}
          width={50}
          icon="arrow-up"
          onClick={() =>
            this.props.returnItemFromTicket({
              ...item,
              amount: item.removedAmount + 1,
            })
          }
        />
        <TicketButton
          primary
          disabled={item.addedAmount > 0 || item.removedAmount === 0}
          width={50}
          icon="arrow-down"
          onClick={() =>
            this.props.returnItemFromTicket({
              ...item,
              amount: item.removedAmount - 1,
            })
          }
        />
      </Section5>
    );
  }


  render() {

    console.log('1111....', this.props.ticketOperations);

    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer data-cy={ticketsSelectors.RETURN_ITEMS_LIST}>
          {this.props.ticketOperations.map((item, i) => (
            <TicketTableRowContainer
              data-cy={ticketsSelectors.RETURN_ITEM_ROW}
              key={i}
              even={(i + 1) % 2}
              highlight={
                (item.removedAmount > 0) ||
                (item.addedAmount > 0)
              }
            >
              <TicketTableField placeholder={item.reference} readonly />
              <TicketTableField placeholder={formatDescription(item)} readonly bigger />
              <TicketTableField placeholder={formatDecimalPlaces(item.price)} readonly />
              {this.getTicketItemAddedAmount(item, i)}
              {this.getTicketItemRemovedAmount(item, i)}
              {this.getTicketItemSubtotalAmount(item, i)}
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
