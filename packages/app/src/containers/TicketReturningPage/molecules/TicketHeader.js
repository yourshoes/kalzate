/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import TicketSectionContainer from '../atoms/TicketSectionContainer';
import Section50 from '../atoms/Section50';
import SectionLeft from '../atoms/SectionLeft';
import SectionRight from '../atoms/SectionRight';
import TicketSearchField from './TicketSearchField';
import messages from '../messages';
import { tickets as ticketsSelectors } from '@kalzate/cy';

export class TicketHeader extends React.Component {
  render() {
    return (
      <TicketSectionContainer>
        <Section50>
          <SectionLeft>
            <TicketSearchField
              intl={this.props.intl}
              ticket={this.props.ticket}
              matches={this.props.ticketMatches}
              getMatches={(...args) => this.props.getTicketMatches(...args)}
              loadTicket={(...args) => this.props.loadTicket(...args)}
            />
          </SectionLeft>
        </Section50>
        <Section50>
          <SectionRight>
            <Button
              inactive={this.props.isTicketCheckoutDisabled}
              icon="check"
              title={<FormattedMessage {...messages.checkoutTicket} />}
              onClick={() =>
                this.props.createTicket({
                  ...this.props.ticket,
                  prevNode: this.props.ticket.id,
                  ...(this.props.ticketOperations.every(({ addedAmount, previousAddedAmount, removedAmount, previousRemovedAmount }) =>
                    previousAddedAmount + addedAmount === previousRemovedAmount + removedAmount) && { nextNode: this.props.ticket.id })
                }, this.props.settings)
              }
            />
            <Button
              data-cy={ticketsSelectors.RETURN_VOUCHER_BUTTON}
              inactive={
                this.props.isTicketVoucherCheckoutDisabled
              }
              primary
              icon="gift"
              title={<FormattedMessage {...messages.giftTicket} />}
              onClick={() =>
                this.props.createTicket({
                  ...this.props.ticket,
                  prevNode: this.props.ticket.id,
                  ...(this.props.ticketOperations.every(({ addedAmount, previousAddedAmount, removedAmount, previousRemovedAmount }) =>
                    previousAddedAmount + addedAmount === previousRemovedAmount + removedAmount) && { nextNode: this.props.ticket.id }),
                  isVoucher: true,
                }, this.props.settings)
              }
            />

          </SectionRight>
        </Section50>
      </TicketSectionContainer>
    );
  }
}

TicketHeader.propTypes = {};

export default TicketHeader;
