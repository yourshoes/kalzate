/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import Button from 'components/Button';
import { TICKET_SOLD_STATE } from 'config';
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
              disabled={this.props.isTicketCheckoutDisabled}
              primary
              icon="gift"
              //@todo title has a conflict with html native title attribute, this prop should be a children and html title prop for html attribute
              title={<FormattedMessage {...messages.giftTicket} />}
              onClick={() =>
                this.props.createTicket({
                  ...this.props.ticket,
                  isGift: true,
                }, this.props.settings)
              }
            />
            <Button
              data-cy={ticketsSelectors.CHECKOUT_BUTTON}
              inactive={
                this.props.isTicketCheckoutDisabled
              }
              disabled={this.props.isTicketCheckoutDisabled}
              primary
              icon="check"
              title={<FormattedMessage {...messages.checkoutTicket} />}
              onClick={() =>
                this.props.createTicket({ ...this.props.ticket }, this.props.settings)
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
