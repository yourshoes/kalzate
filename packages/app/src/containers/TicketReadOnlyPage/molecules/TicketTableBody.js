/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import TicketTableBodyContainer from '../atoms/TicketTableBodyContainer';
import HeightAdapterContainer from '../atoms/HeightAdapterContainer';
import TicketTableRowContainer from '../atoms/TicketTableRowContainer';
import TicketTableField from './TicketTableField';
import TicketTableAmountField from './TicketTableAmountField';
import { getSubtotal, formatDescription, formatDecimalPlaces } from 'utils/ticket';

export class TicketTableBody extends React.Component {
  getTicketItemAddedAmount(stock, operation) {

    if (!operation.addedAmount && !operation.previousAddedAmount) {
      return (<TicketTableField placeholder={operation.amount} readonly />);
    }

    if (!operation.previousAddedAmount) {
      return (<TicketTableField placeholder={operation.addedAmount} readonly />);
    }

    return (

      <TicketTableAmountField
        placeholder={operation.addedAmount}
        info={<FormattedMessage {...messages.addedAmountInfoTooltip}
          values={{
            amount: operation.previousAddedAmount
          }} />}
        readonly
      />

    )

  }

  getTicketItemRemovedAmount(_, operation) {

    if (!operation.removedAmount && !operation.previousRemovedAmount) {
      return (<TicketTableField placeholder="0" readonly />);
    }

    console.log('operation!!!', operation)
    if (operation.previousRemovedAmount) {
      return (
        <TicketTableAmountField
          placeholder={operation.removedAmount}
          info={<FormattedMessage {...messages.removedAmountInfoTooltip}
            values={{
              amount: operation.previousRemovedAmount
            }} />}
          readonly
        />
      )
    }

    return (
      <TicketTableAmountField
        placeholder={operation.removedAmount}
        readonly
      />
    )

  }

  getTicketItemSubtotalAmount(stock, operation) {

    if (operation.amount) {
      return (<TicketTableField
        placeholder={formatDecimalPlaces(getSubtotal({ stock, ...operation }))}
        readonly
      />)
    }

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

  getTicketItemDiscount(stock, operation) {

    return <TicketTableField placeholder={operation.discountValue || '0'} readonly />

  }


  render() {
    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer>
          {this.props.ticketOperations.map(({ stock, ...operation }, i) => (
            <TicketTableRowContainer key={i} even={(i + 1) % 2}>
              <TicketTableField placeholder={stock.reference} readonly />
              <TicketTableField placeholder={formatDescription(stock)} readonly bigger />
              <TicketTableField placeholder={formatDecimalPlaces(stock.price)} readonly />
              {this.getTicketItemAddedAmount(stock, operation)}
              {this.getTicketItemRemovedAmount(stock, operation)}
              {this.getTicketItemDiscount(stock, operation)}
              {this.getTicketItemSubtotalAmount(stock, operation)}
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
