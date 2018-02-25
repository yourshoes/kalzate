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
import {
  StockTableHeader,
  StockTableBody,
  StockField,
  StockButton,
  Title,
  Subtitle,
  StockTable,
} from 'ui/containers/StockItems/wrappers';
import Center from 'ui/components/Center';
import NotFound from 'ui/components/NotFound';
import makeSelectTicketItems from './selectors';
import messages from './messages';
import {
  Container,
  TicketCartContainer,
  Section50,
  SectionLeft,
  Search,
  Vat,
  Discount,
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
              <Button primary icon="gift" title="Is a Gift" />
              <Button primary icon="check" title="Checkout" />
            </SectionRight>
          </Section50>
        </TicketCartContainer>
        <TicketCartSummaryContainer>
          {true &&
            <Center>
              <NotFound icon="thumbsdown">
                <Title>
                  Ticket empty
              </Title>
                <Subtitle>
                  Add some items to this ticket
              </Subtitle>
              </NotFound>
            </Center>}


          {/* false && <StockTableHeader content>
            <StockField placeholder="Reference" />
            <StockField placeholder="Description" />
            <StockField placeholder="Price" />
            <StockField placeholder="Amount" />
            <StockButton primary icon="remove" />
          </StockTableHeader>
            <StockTableBody>
              <StockTable items={[]} />
            </StockTableBody>
          */}
        </TicketCartSummaryContainer>
        <TicketCartContainer>
          <Section50>
            <SectionLeft>
              <Vat />
            </SectionLeft>
            <SectionLeft>
              <Discount />
            </SectionLeft>
          </Section50>
          <Section50>
            <SectionRight>
              <Button icon="cloud-download" title="Save Ticket" />
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
  count: PropTypes.number,
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
