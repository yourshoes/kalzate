/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import Button from 'components/Button';
import {
  TICKET_RETURN_STATE,
  TICKET_SOLD_STATE,
} from 'config';
import TicketSectionContainer from '../atoms/TicketSectionContainer';
import Section50 from '../atoms/Section50';
import SectionLeft from '../atoms/SectionLeft';
import SectionRight from '../atoms/SectionRight';
import TicketSearchField from './TicketSearchField';
import messages from '../messages';

export class TicketHeader extends React.Component {

  render() {
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
            <Button inactive={isEmpty(this.props.ticket.items)} primary icon="cloud-download" title={<FormattedMessage {...messages.printTicket} />} onClick={() => this.props.closeTicket(this.props.ticket, { state: TICKET_SOLD_STATE, asGift: true, settings: this.props.settings })} />
          </SectionRight>
        </Section50>
      </TicketSectionContainer>
    );
  }
}

TicketHeader.propTypes = {};

export default TicketHeader;
