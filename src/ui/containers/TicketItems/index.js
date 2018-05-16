/*
 *
 * TicketItems
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectTicketItems,
  makeSelectTicketTmpData,
} from './selectors';
import {
  updateTmpData,
  updateTicketData,
  removeStockFromTicket,
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
  items: PropTypes.array,
  tmp: PropTypes.object,
  updateTmpData: PropTypes.func,
  updateTicketData: PropTypes.func,
  removeStockFromTicket: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectTicketItems(),
  tmp: makeSelectTicketTmpData(),
});


function mapDispatchToProps(dispatch) {
  return {
    updateTmpData: (reference, data) =>
      dispatch(updateTmpData(reference, data)),
    updateTicketData: (item, data) =>
      dispatch(updateTicketData(item, data)),
    removeStockFromTicket: (item, positioninList) =>
      dispatch(removeStockFromTicket(item, positioninList)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketItems);
