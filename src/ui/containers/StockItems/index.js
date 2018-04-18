/*
 *
 * StockItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectStockItems,
  makeSelectStockLimit,
  makeSelectStockOffset,
  makeSelectStockCount,
  makeSelectStockSearch,
  makeSelectStockTmpData,
} from './selectors';
import {
  createStock,
  updateStock,
  refreshStock,
  removeStock,
  exportStock,
  searchStock,
  updateTmpData,
} from './actions';
import Container from './atoms/Container';
import StockTableHeader from './molecules/StockTableHeader';
import StockTableBody from './molecules/StockTableBody';
import StockPagination from './molecules/StockPagination';

export function StockItemsPage(props) {
  return (
    <Container>
      <StockTableHeader {...props} />
      <StockTableBody {...props} />
      <StockPagination {...props} />
    </Container>
  );
}

StockItemsPage.propTypes = {
  total: PropTypes.number,
  items: PropTypes.any, // @todo move to array
  skip: PropTypes.number,
  limit: PropTypes.number,
  match: PropTypes.object,
  tmp: PropTypes.object,
  createStock: PropTypes.func,
  updateStock: PropTypes.func,
  refreshStock: PropTypes.func,
  removeStock: PropTypes.func,
  exportStock: PropTypes.func,
  updateTmpData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectStockItems(),
  limit: makeSelectStockLimit(),
  skip: makeSelectStockOffset(),
  total: makeSelectStockCount(),
  search: makeSelectStockSearch(),
  tmp: makeSelectStockTmpData(),
});

function mapDispatchToProps(dispatch) {
  return {
    createStock: (stock) => dispatch(createStock(stock)),
    updateStock: (stock) => dispatch(updateStock(stock)),
    refreshStock: (limit, skip) => dispatch(refreshStock(limit, skip)),
    removeStock: (reference) => dispatch(removeStock(reference)),
    exportStock: (decrypt) => dispatch(exportStock(decrypt)),
    searchStock: (search, limit, skip) =>
      dispatch(searchStock(search, limit, skip)),
    updateTmpData: (reference, data) =>
      dispatch(updateTmpData(reference, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemsPage);
