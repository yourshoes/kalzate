/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import { TICKET_SAVE_STATE } from 'config';
import Button from 'components/Button';
import TicketSectionContainer from '../atoms/TicketSectionContainer';
import Section50 from '../atoms/Section50';
import SectionLeft from '../atoms/SectionLeft';
import SectionRight from '../atoms/SectionRight';
import TicketDiscountField from './TicketDiscountField';
import TicketVatField from './TicketVatField';
import messages from '../messages';
import { tickets as ticketsSelectors } from '@kalzate/cy';

const section50StylesLeftCont = `
@media (max-width: 1080px) {
  width: 35%;
}`;

const section50StylesRightCont = `
@media (max-width: 1080px) {
  width: 65%;
}`;

export class TicketFooter extends React.Component {
  render() {
    return (
      <TicketSectionContainer>
        <Section50 includeStyles={section50StylesLeftCont}>
          <SectionLeft>
            {/* <TicketVatField
              tax={this.props.ticket.tax}
              updateTax={(tax) => this.props.updateTicketTax(tax)}
            /> */}
          </SectionLeft>
          <SectionLeft>
            {/* <TicketDiscountField
              discount={this.props.ticket.discount}
              updateDiscount={(discount) => this.props.updateTicketDiscount(discount)}
            /> */}
          </SectionLeft>
        </Section50>
        <Section50 includeStyles={section50StylesRightCont}>
          <SectionRight>
            {/* <Button
              data-cy={ticketsSelectors.SELL_SAVE_BUTTON}
              inactive={this.props.isEmptyTicket}
              icon="cloud-download"
              title={<FormattedMessage {...messages.saveTicket} />}
              onClick={() =>
                this.props.closeTicket(this.props.ticket, { state: TICKET_SAVE_STATE })
              }
            /> */}
            <Button
              data-cy={ticketsSelectors.NEW_TICKET_BUTTON}
              inactive={this.props.isEmptyTicket}
              icon="trashcan"
              title={<FormattedMessage {...messages.newTicket} />}
              onClick={() => this.props.removeTicket()}
            />
            {/* Full ticket displays a modal where user can edit the final content of the ticket, useful in same cases */}
            {/* <Button icon="checklist" title="Full Ticket" /> */}
          </SectionRight>
        </Section50>
      </TicketSectionContainer>
    );
  }
}

TicketFooter.propTypes = {};

export default TicketFooter;
