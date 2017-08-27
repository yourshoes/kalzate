/*
 *
 * StockItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Center from 'ui/components/Center';
import NotFound from 'ui/components/NotFound';
import {
  makeSelectStockItems,
  makeSelectStockLimit,
  makeSelectStockOffset,
  makeSelectStockCount,
} from './selectors';
import messages from './messages';
import {
  Container,
  StockTableHeader,
  StockTableBody,
  StockField,
  StockButton,
  Title,
  Subtitle,
} from './wrappers';

export class StockItems extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <StockTableHeader>
          <StockField placeholder="Reference" />
          <StockField placeholder="Brand" />
          <StockField placeholder="Gender" />
          <StockField placeholder="Color" />
          <StockField placeholder="Size" />
          <StockField placeholder="Price" />
          <StockField placeholder="Amount" />
          <StockButton primary icon="search" />
          <StockButton primary icon="plus" />
        </StockTableHeader>
        <StockTableBody>
          {!this.props.count &&
            <Center>
              <NotFound icon="thumbsdown">
                <Title>
                  <FormattedMessage {...messages.notFound} />
                </Title>
                <Subtitle>
                  <FormattedMessage {...messages.notFoundHelp} />
                </Subtitle>
              </NotFound>
            </Center>}
        </StockTableBody>
      </Container>
    );
  }
}

StockItems.propTypes = {
  count: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectStockItems(),
  limit: makeSelectStockLimit(),
  offset: makeSelectStockOffset(),
  count: makeSelectStockCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItems);
