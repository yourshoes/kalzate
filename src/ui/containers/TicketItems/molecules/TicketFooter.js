/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Button from 'ui/components/Button';
import TicketSectionContainer from '../atoms/TicketSectionContainer';
import Section50 from '../atoms/Section50';
import SectionLeft from '../atoms/SectionLeft';
import SectionRight from '../atoms/SectionRight';
import TicketDiscountField from './TicketDiscountField';
import TicketVatField from './TicketVatField';

export class TicketFooter extends React.Component {

  render() {
    return (
      <TicketSectionContainer>
        <Section50>
          <SectionLeft>
            <TicketVatField />
          </SectionLeft>
          <SectionLeft>
            <TicketDiscountField />
          </SectionLeft>
        </Section50>
        <Section50>
          <SectionRight>
            <Button icon="cloud-download" title="Save Ticket" />
            <Button icon="trashcan" title="Delete Ticket" />
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
