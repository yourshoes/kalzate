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
import { updateStock, refreshStock, removeStock } from './actions';
import {
  Container,
  StockTableHeader,
  StockTableBody,
  StockField,
  StockButton,
  Title,
  Subtitle,
  StockTable,
  StockPagination,
} from './wrappers';

export class StockItems extends React.Component {

  constructor() {
    super();
    this.state = {
      reference: '',
      brand: '',
      gender: '',
      colors: [],
      size: '',
      price: '',
      amount: '',
    };
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <StockTableHeader content>
          <StockField placeholder="Reference" value={this.state.reference} onChange={(reference) => this.setState({ reference })} />
          <StockField placeholder="Brand" value={this.state.brand} onChange={(brand) => this.setState({ brand })} />
          <StockField placeholder="Gender" value={this.state.gender} onChange={(gender) => this.setState({ gender })} />
          <StockField placeholder="Color" value={this.state.colors.join()} onChange={(color) => this.setState({ colors: [color] })} />
          <StockField placeholder="Size" value={this.state.size} onChange={(size) => this.setState({ size: parseInt(size, 10) })} />
          <StockField placeholder="Price" value={this.state.price} onChange={(price) => this.setState({ price: parseFloat(price, 10) })} />
          <StockField placeholder="Amount" value={this.state.amount} onChange={(amount) => this.setState({ amount: parseInt(amount, 10) })} />
          <StockButton primary icon="search" />
          <StockButton primary icon="plus" onClick={() => this.props.updateStock({ reference: this.state.reference, brand: this.state.brand, size: this.state.size, price: this.state.price, amount: this.state.amount, gender: this.state.gender, colors: this.state.colors })} />
          <StockButton primary icon="cloud-upload" />
        </StockTableHeader>
        <StockTableBody content>
          {!this.props.total &&
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
          {!!this.props.total && <StockTable items={this.props.items} onRemove={({ reference }) => this.props.removeStock(reference)} />}
        </StockTableBody>
        <StockPagination total={this.props.total} limit={this.props.limit} skip={this.props.skip} refresh={this.props.refreshStock} />
      </Container>
    );
  }
}

StockItems.propTypes = {
  total: PropTypes.number,
  items: PropTypes.array,
  skip: PropTypes.number,
  limit: PropTypes.number,
  updateStock: PropTypes.func,
  refreshStock: PropTypes.func,
  removeStock: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectStockItems(),
  limit: makeSelectStockLimit(),
  skip: makeSelectStockOffset(),
  total: makeSelectStockCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateStock: (stock) =>
      dispatch(updateStock(stock)),
    refreshStock: (limit, skip) =>
      dispatch(refreshStock(limit, skip)),
    removeStock: (reference) =>
      dispatch(removeStock(reference)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItems);
