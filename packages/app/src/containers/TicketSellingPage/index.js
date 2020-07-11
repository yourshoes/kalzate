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
  ticket,
  ticketBalance,
  ticketOperations,
  isEmptyTicket,
  isTicketCheckoutDisabled
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
  removeTicket,
} from './actions';
import {
  getTicketMatches,
  loadTicket,
  createAddOperation,
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
  ticketMatches,
  tmp: makeSelectTicketTmpData(),
  settings: selectSettingsData(),
  ticketOperations,
  ticketBalance,
  isEmptyTicket,
  isTicketCheckoutDisabled
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
    removeTicket: () =>
      dispatch(removeTicket()),


    getTicketMatches: (field, value) => dispatch(getTicketMatches(field, value)),
    loadTicket: (...args) => dispatch(loadTicket(...args)),
    createTicket: (ticket, settings) =>
      dispatch(createTicket(ticket, settings)),
    createAddOperation: (stock, operation) =>
      dispatch(createAddOperation(stock, operation)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TicketItems));
