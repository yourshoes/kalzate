/*
 *
 * TicketItems
 *
 */

import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTicketDomain,
  makeSelectTicketTmpData,
  makeSelectTicketCreatedAtMatches,
  selectSettingsData,
} from './selectors';
import {
  ticket, ticketOperations, isEmptyTicket
} from 'selectors/tickets';
import {
  ticketMatches
} from 'selectors/tmp';
import {
  updateTmpData,
  updateTicketData,
  updateTicketTax,
  updateTicketDiscount,
  removeStockFromTicket,
  returnStockFromTicket,
  undoReturnStockFromTicket,
  removeTicket,
  closeTicket,
} from './actions';
import {
  getTicketMatches,
  loadTicket
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
  ticketMatches,
  isEmptyTicket,
  tmp: makeSelectTicketTmpData(),
  settings: selectSettingsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateTmpData: (reference, data) =>
      dispatch(updateTmpData(reference, data)),
    updateTicketData: (item, data) =>
      dispatch(updateTicketData(item, data)),
    updateTicketTax: (vat) =>
      dispatch(updateTicketTax(vat)),
    updateTicketDiscount: (discount) =>
      dispatch(updateTicketDiscount(discount)),
    removeStockFromTicket: (item, positioninList) =>
      dispatch(removeStockFromTicket(item, positioninList)),
    returnStockFromTicket: (item, positioninList) =>
      dispatch(returnStockFromTicket(item, positioninList)),
    undoReturnStockFromTicket: (item, positioninList) =>
      dispatch(undoReturnStockFromTicket(item, positioninList)),
    removeTicket: () =>
      dispatch(removeTicket()),
    getTicketMatches: (field, value) => dispatch(getTicketMatches(field, value)),
    loadTicket: (...args) => dispatch(loadTicket(...args)),
    closeTicket: (ticket, state) =>
      dispatch(closeTicket(ticket, state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TicketItems));
