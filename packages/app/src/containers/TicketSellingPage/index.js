/*
 *
 * TicketItems
 *
 */

import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ticket, ticketBalance, isTicketCheckoutDisabled } from 'selectors/tickets';

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
  removeTicket,
  closeTicket,
  getMatches,
  loadTicket,
} from './actions';
import {
  removeStockFromTicket,
  updateTicketOperation,
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
  tmp: makeSelectTicketTmpData(),
  matches: makeSelectTicketCreatedAtMatches(),
  settings: selectSettingsData(),
  ticketBalance,
  isTicketCheckoutDisabled
});

function mapDispatchToProps(dispatch) {
  return {
    updateTmpData: (reference, data) =>
      dispatch(updateTmpData(reference, data)),
    updateTicketData: (item, data) =>
      dispatch(updateTicketData(item, data)),
    updateTicketOperation: (reference, data) =>
      dispatch(updateTicketOperation(reference, data)),
    updateTicketTax: (vat) =>
      dispatch(updateTicketTax(vat)),
    updateTicketDiscount: (discount) =>
      dispatch(updateTicketDiscount(discount)),
    removeStockFromTicket: (operationIndexPosition) =>
      dispatch(removeStockFromTicket(operationIndexPosition)),
    removeTicket: () =>
      dispatch(removeTicket()),
    getMatches: (field, value) => dispatch(getMatches(field, value)),
    loadTicket: (ticket, options) => dispatch(loadTicket(ticket, options)),
    createTicket: (ticket, settings) =>
      dispatch(createTicket(ticket, settings)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TicketItems));
