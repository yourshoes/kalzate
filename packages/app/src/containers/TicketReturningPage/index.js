/*
 *
 * TicketItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  ticket, ticketOperations, ticketBalance, isEmptyTicket,
  isTicketCheckoutDisabled, isTicketVoucherCheckoutDisabled
} from 'selectors/tickets';
import {
  ticketMatches
} from 'selectors/tmp';
import {
  makeSelectTicketTmpData,
  makeSelectTicketCreatedAtMatches,
  selectSettingsData,
} from './selectors';
import {
  updateTmpData,
  updateTicketData,
  updateTicketTax,
  updateTicketDiscount,
  undoReturnStockFromTicket,
  returnAllStockFromTicket,
  removeTicket,
} from './actions';

import {
  getTicketMatches,
  loadTicket,
  createAddOperation,
  createRemoveOperation,
  createTicket
} from 'actions/tickets';

import Container from './atoms/Container';
import TicketHeader from './molecules/TicketHeader';
import TicketBody from './molecules/TicketBody';
import TicketFooter from './molecules/TicketFooter';

export class TicketItems extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <TicketHeader {...this.props} />
        <TicketBody {...this.props} />
        <TicketFooter {...this.props} />
      </Container>
    );
  }
}

TicketItems.propTypes = {
  ticket: PropTypes.object,
  tmp: PropTypes.object,
  updateTmpData: PropTypes.func,
  updateTicketData: PropTypes.func,
  removeStockFromTicket: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ticket,
  ticketOperations,
  ticketBalance,
  ticketMatches,
  isEmptyTicket,
  isTicketCheckoutDisabled,
  isTicketVoucherCheckoutDisabled,
  tmp: makeSelectTicketTmpData(),
  matches: makeSelectTicketCreatedAtMatches(),
  settings: selectSettingsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateTmpData: (reference, data) => dispatch(updateTmpData(reference, data)),
    updateTicketData: (item, data) => dispatch(updateTicketData(item, data)),
    updateTicketTax: (vat) => dispatch(updateTicketTax(vat)),
    updateTicketDiscount: (discount) => dispatch(updateTicketDiscount(discount)),

    undoReturnStockFromTicket: (item, positioninList) =>
      dispatch(undoReturnStockFromTicket(item, positioninList)),
    returnAllStockFromTicket: () => dispatch(returnAllStockFromTicket()),
    removeTicket: () => dispatch(removeTicket()),

    getTicketMatches: (field, value) => dispatch(getTicketMatches(field, value)),
    loadTicket: (...args) => dispatch(loadTicket(...args)),
    createAddOperation: (stock, operation) =>
      dispatch(createAddOperation(stock, operation)),
    createRemoveOperation: (stock, operation) =>
      dispatch(createRemoveOperation(stock, operation)),
    createTicket: (ticket, settings) =>
      dispatch(createTicket(ticket, settings)),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TicketItems));
