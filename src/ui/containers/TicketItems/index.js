/*
 *
 * TicketItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTicketDomain,
  makeSelectTicketTmpData,
  makeSelectTicketCreatedAtMatches,
} from './selectors';
import {
  updateTmpData,
  updateTicketData,
  updateTicketTax,
  updateTicketDiscount,
  removeStockFromTicket,
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
  ticket: selectTicketDomain(),
  tmp: makeSelectTicketTmpData(),
  matches: makeSelectTicketCreatedAtMatches(),
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
    removeTicket: () =>
      dispatch(removeTicket()),
    getMatches: (field, value) => dispatch(getMatches(field, value)),
    loadTicket: (ticket, options) => dispatch(loadTicket(ticket, options)),
    closeTicket: (ticket, state) =>
      dispatch(closeTicket(ticket, state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketItems);
