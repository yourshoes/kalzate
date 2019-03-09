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
import TicketTableAmountFieldFixed from './TicketTableAmountFieldFixed';
import TicketTableButton from './TicketTableButton';
import Section5 from '../atoms/Section5';
import TicketButton from '../atoms/TicketButton';

export class TicketTableBody extends React.Component {
  getTicketItemAction(item, i) {
    // if returning item
    // if (item.amount_return) {
    //   return (
    //     <TicketTableButton
    //       primary
    //       icon="remove-close"
    //       onClick={() => this.props.undoReturnStockFromTicket(item, i)}
    //     />
    //   );
    // }
    // if new ticket item
    if (item.added) {
      return (
        <TicketTableButton
          primary
          icon="remove-close"
          onClick={() => this.props.removeStockFromTicket(item, i)}
        />
      );
    }
    // otherwise (existing item to be returned)
    return (
      <Section5>
        {/* onClick={() => this.props.returnStockFromTicket(item, i, (item.amount_return || 0) + 1)} */}
        <TicketButton
          primary
          width={50}
          icon="arrow-up"
          onClick={() => {
            let amount_return = (item.amount_return || 0) + 1;
            if (amount_return + (item.amount_return_prev || 0) > item.amount) {
              amount_return = item.amount - (item.amount_return_prev || 0);
            }
            console.log(amount_return);
            this.props.returnStockFromTicket(item, i, amount_return);
            // this.props.updateTicketData(item, {
            //   amount_return,
            // });
          }}
        />
        {/* onClick={() => this.props.returnStockFromTicket(item, i, (item.amount_return || 0) - 1)} */}
        <TicketButton
          primary
          width={50}
          icon="arrow-down"
          onClick={() => {
            let amount_return = (item.amount_return || 0) - 1;
            if (amount_return < 0) {
              amount_return = 0;
            }
            this.props.returnStockFromTicket(item, i, amount_return);
            // this.props.updateTicketData(item, {
            //   amount_return,
            // });
          }}
        />
      </Section5>
    );
  }

  render() {
    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer>
          {this.props.ticket.items.map((item, i) => (
            <TicketTableRowContainer
              key={i}
              even={(i + 1) % 2}
              highlight={
                (item.toReturn && item.amount_return_prev > 0) ||
                (item.toReturn && item.amount_return > 0)
              }
            >
              <TicketTableField placeholder={item.reference} readonly />
              <TicketTableField placeholder={formatDescription(item)} readonly bigger />
              <TicketTableField placeholder={item.price.toFixed(2)} readonly />
              {item.added ? (
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
              ) : (
                <TicketTableField placeholder={item.amount} readonly />
              )}
              {item.added ? (
                <TicketTableField placeholder="0" readonly />
              ) : item.amount === item.amount_return_prev ? (
                <TicketTableField placeholder={item.amount} readonly />
              ) : (
                <TicketTableAmountFieldFixed
                  placeholder={
                    item.amount_return_prev > 0
                      ? item.amount_return_prev > 1
                        ? `${item.amount_return_prev - item.amount_return_prev_last} ( ${
                            item.amount_return_prev
                          } )`
                        : `${item.amount_return_prev - item.amount_return_prev_last}`
                      : ''
                  }
                  value={item.amount_return || '0'}
                />
              )}
              <TicketTableField
                placeholder={(item.price * (item.amount - (item.amount_return || 0))).toFixed(2)}
                readonly
              />
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
