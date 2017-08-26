/*
 *
 * StockItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectStockItems from './selectors';
import messages from './messages';
import {
  Container,
  TicketStockEditorContainer,
  TicketStockItemsContainer,
  Section10,
  StockField,
  StockButton,
} from './wrappers';

export class StockItems extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <TicketStockEditorContainer>
          <Section10>
            <StockField placeholder="Reference" />
          </Section10>
          <Section10>
            <StockField placeholder="Brand" />
          </Section10>
          <Section10>
            <StockField placeholder="Gender" />
          </Section10>
          <Section10>
            <StockField placeholder="Color" />
          </Section10>
          <Section10>
            <StockField placeholder="Size" />
          </Section10>
          <Section10>
            <StockField placeholder="Price" />
          </Section10>
          <Section10>
            <StockField placeholder="Amount" />
          </Section10>
          <Section10>
            <StockButton icon="search" />
            <StockButton icon="plus" />
          </Section10>
        </TicketStockEditorContainer>
        <TicketStockItemsContainer>2</TicketStockItemsContainer>
      </Container>
    );
  }
}

StockItems.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  StockItems: makeSelectStockItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItems);
