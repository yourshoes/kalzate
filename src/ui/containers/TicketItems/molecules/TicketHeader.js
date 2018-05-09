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
import TicketSearchField from './TicketSearchField';

export class TicketHeader extends React.Component {

  render() {
    return (
      <TicketSectionContainer>
        <Section50>
          <SectionLeft>
            <TicketSearchField />
          </SectionLeft>
        </Section50>
        <Section50>
          <SectionRight>
            <Button primary icon="gift" title="Is a Gift" />
            <Button primary icon="check" title="Checkout" />
          </SectionRight>
        </Section50>
      </TicketSectionContainer>
    );
  }
}

TicketHeader.propTypes = {};

export default TicketHeader;
