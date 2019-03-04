/*
 *
 * StockItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import {
  addStockToTicket,
} from 'containers/TicketItems/actions';
import {
  makeSelectStockItems,
  makeSelectStockLimit,
  makeSelectStockOffset,
  makeSelectStockCount,
  makeSelectStockLoading,
  makeSelectStockSearch,
  makeSelectStockTmpData,
  makeSelectStockReferenceMatches,
} from './selectors';
import {
  createStock,
  updateStock,
  refreshStock,
  removeStock,
  exportStock,
  searchStock,
  getMatches,
  updateTmpData,
} from './actions';
import Container from './atoms/Container';
import StockTableHeader from './molecules/StockTableHeader';
import StockTableBody from './molecules/StockTableBody';
import StockPagination from './molecules/StockPagination';
import {SpinnerContainer} from "./atoms/SpinnerContainer";


export function StockItemsPage({loading, ...props}) {
  // @odo: use Fragment to group !loading options
  return (
    <Container>
      {loading && <SpinnerContainer/>}
      {!loading && <StockTableHeader {...props} />}
      {!loading && <StockTableBody {...props} />}
      {!loading && <StockPagination {...props} />}
    </Container>
  );
}

StockItemsPage.propTypes = {
  total: PropTypes.number,
  items: PropTypes.any, // @todo move to array
  skip: PropTypes.number,
  limit: PropTypes.number,
  match: PropTypes.object,
  matches: PropTypes.array,
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
  loading: makeSelectStockLoading(),
  search: makeSelectStockSearch(),
  matches: makeSelectStockReferenceMatches(),
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
    getMatches: (field, value) => dispatch(getMatches(field, value)),
    updateTmpData: (reference, data) =>
      dispatch(updateTmpData(reference, data)),
    addStockToTicket: (stockItem) =>
      dispatch(addStockToTicket(stockItem)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StockItemsPage));
