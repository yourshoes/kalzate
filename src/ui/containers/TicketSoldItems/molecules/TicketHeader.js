/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Button from 'ui/components/Button';
import {
  TICKET_RETURN_STATE,
} from 'ui/constants';
import TicketSectionContainer from '../atoms/TicketSectionContainer';
import Section50 from '../atoms/Section50';
import SectionLeft from '../atoms/SectionLeft';
import SectionRight from '../atoms/SectionRight';
import TicketSearchField from './TicketSearchField';

export class TicketHeader extends React.Component {

  render() {
    return (
      <TicketSectionContainer>
        <Section50>
          <SectionLeft>
            <TicketSearchField
              ticket={this.props.ticket}
              matches={this.props.matches}
              getMatches={(...args) => this.props.getMatches(...args)}
              loadTicket={(...args) => this.props.loadTicket(...args)}
            />
          </SectionLeft>
        </Section50>
        <Section50>
          <SectionRight>
            <Button inactive={isEmpty(this.props.ticket.items) || this.props.ticket.items.every((item) => !item.amount_return)} primary icon="gift" title="Voucher" onClick={() => this.props.closeTicket(this.props.ticket, { state: TICKET_RETURN_STATE, relatesTo: String(this.props.ticket.created_at), asVoucher: true, settings: this.props.settings })} />
            <Button inactive={isEmpty(this.props.ticket.items) || this.props.ticket.items.every((item) => !item.amount_return)} icon="check" title="Return" onClick={() => this.props.closeTicket(this.props.ticket, { state: TICKET_RETURN_STATE, relatesTo: String(this.props.ticket.created_at), asVoucher: false, settings: this.props.settings })} />
          </SectionRight>
        </Section50>
      </TicketSectionContainer>
    );
  }
}

TicketHeader.propTypes = {};

export default TicketHeader;
