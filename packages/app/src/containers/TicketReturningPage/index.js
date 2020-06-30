/*
 *
 * TicketItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { ticket, ticketBalance, isTicketCheckoutDisabled } from 'selectors/tickets';
import {
  selectTicketDomain,
  makeSelectTicketTmpData,
  makeSelectTicketCreatedAtMatches,
  selectSettingsData,
} from './selectors';
import {
  updateTmpData,
  updateTicketData,
  updateTicketTax,
  updateTicketDiscount,
  removeStockFromTicket,
  returnStockFromTicket,
  undoReturnStockFromTicket,
  returnAllStockFromTicket,
  removeTicket,
  closeTicket,
  getMatches,
  loadTicket,
} from './actions';
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
    removeStockFromTicket: (item, positioninList) =>
      dispatch(removeStockFromTicket(item, positioninList)),
    returnStockFromTicket: (item, positioninList, value) =>
      dispatch(returnStockFromTicket(item, positioninList, value)),
    undoReturnStockFromTicket: (item, positioninList) =>
      dispatch(undoReturnStockFromTicket(item, positioninList)),
    returnAllStockFromTicket: () => dispatch(returnAllStockFromTicket()),
    removeTicket: () => dispatch(removeTicket()),
    getMatches: (field, value) => dispatch(getMatches(field, value)),
    loadTicket: (ticket, options) => dispatch(loadTicket(ticket, options)),
    closeTicket: (ticket, state) => dispatch(closeTicket(ticket, state)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TicketItems));
