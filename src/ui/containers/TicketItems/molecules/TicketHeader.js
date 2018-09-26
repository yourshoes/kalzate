/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import Button from 'ui/components/Button';
import {
  TICKET_SOLD_STATE,
} from 'ui/constants';
import TicketSectionContainer from '../atoms/TicketSectionContainer';
import Section50 from '../atoms/Section50';
import SectionLeft from '../atoms/SectionLeft';
import SectionRight from '../atoms/SectionRight';
import TicketSearchField from './TicketSearchField';
import messages from '../messages';

export class TicketHeader extends React.Component {

  render() {
    console.log(this.props.ticket.givenAmount, this.props.ticket.totalAmount, this.props.ticket.givenAmount < this.props.ticket.totalAmount);
    return (
      <TicketSectionContainer>
        <Section50>
          <SectionLeft>
            <TicketSearchField
              intl={this.props.intl}
              ticket={this.props.ticket}
              matches={this.props.matches}
              getMatches={(...args) => this.props.getMatches(...args)}
              loadTicket={(...args) => this.props.loadTicket(...args)}
            />
          </SectionLeft>
        </Section50>
        <Section50>
          <SectionRight>
            <Button inactive={isEmpty(this.props.ticket.items)} primary icon="gift" title={<FormattedMessage {...messages.giftTicket} />} onClick={() => this.props.closeTicket(this.props.ticket, { state: TICKET_SOLD_STATE, asGift: true, settings: this.props.settings })} />
            <Button inactive={isEmpty(this.props.ticket.items) || (Number(this.props.ticket.givenAmount) < Number(this.props.ticket.totalAmount))} primary icon="check" title={<FormattedMessage {...messages.checkoutTicket} />} onClick={() => this.props.closeTicket(this.props.ticket, { state: TICKET_SOLD_STATE, asGift: false, settings: this.props.settings })} />
          </SectionRight>
        </Section50>
      </TicketSectionContainer>
    );
  }
}

TicketHeader.propTypes = {};

export default TicketHeader;
