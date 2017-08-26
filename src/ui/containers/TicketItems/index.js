/*
 *
 * TicketItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Button from 'ui/components/Button';
import makeSelectTicketItems from './selectors';
import messages from './messages';
import {
  Container,
  TicketCartContainer,
  Section50,
  SectionLeft,
  Search,
  SectionRight,
  TicketCartSummaryContainer,
} from './wrappers';

export class TicketItems extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <TicketCartContainer>
          <Section50>
            <SectionLeft>
              <Search />
            </SectionLeft>
          </Section50>
          <Section50>
            <SectionRight>
              <Button primary icon="check" title="Checkout" />
            </SectionRight>
          </Section50>
        </TicketCartContainer>
        <TicketCartSummaryContainer>1</TicketCartSummaryContainer>
        <TicketCartContainer>
          <Section50>
            <SectionLeft>
              <Search />
            </SectionLeft>
            <SectionLeft>
              <Search />
            </SectionLeft>
          </Section50>
          <Section50>
            <SectionRight>
              <Button icon="checklist" title="Full Ticket" />
            </SectionRight>
          </Section50>
        </TicketCartContainer>
      </Container>
    );
  }
}

TicketItems.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  TicketItems: makeSelectTicketItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketItems);
