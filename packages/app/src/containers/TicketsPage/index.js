/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { isTicketReadOnly, isNewTicket } from 'selectors/tickets';

import TicketBasePage from 'containers/TicketSellingPage';
import TicketReturningPage from 'containers/TicketReturningPage';
import TicketReadOnlyPage from 'containers/TicketReadOnlyPage';
import TicketTotal from 'containers/TicketTotalContainer';
import TicketPayments from 'containers/TicketPaymentsContainer';
import StockItems from 'containers/StockItems';
import StockItemsBasic from 'containers/StockItemsBasic';
import { Grid, Row2, Column } from 'components/Grid';
import {
  makeSelectTicketTotalVisibility,
  makeSelectTicketReadOnly,
  makeSelectTicketPaymentsVisibility,
  makeSelectTicketState,
} from 'containers/TicketsPage/selectors';
import { DEFAULT_SCHEMA_TYPE } from 'config';

export class TicketsPage extends React.Component {

  getItemsComponent() {

    if (this.props.isNewTicket) {
      return <TicketBasePage />;
    }

    if (this.props.isTicketReadOnly) {
      return <TicketReadOnlyPage />;
    }

    return <TicketReturningPage />;
  }
  getStockItemsComponent() {
    if (DEFAULT_SCHEMA_TYPE === 'SCHEMA_SHOES') return <StockItems />;
    if (DEFAULT_SCHEMA_TYPE === 'SCHEMA_BASIC') return <StockItemsBasic />;

    return <StockItems />;
  }

  render() {
    return (
      <Grid>
        <Helmet title="Kalzate Ticket" meta={[{ name: 'description', content: 'Ticket' }]} />
        <Row2>
          <Column>{this.getItemsComponent()}</Column>
          <Column w={this.props.ticketTotalVisibility ? '300px' : '25px'}>
            <TicketTotal />
          </Column>
        </Row2>
        <Row2>
          <Column>{this.getStockItemsComponent()}</Column>
          <Column w={this.props.ticketPaymentsVisibility ? '300px' : '25px'}>
            <TicketPayments />
          </Column>
        </Row2>
      </Grid>
    );
  }
}

TicketsPage.propTypes = {
  ticketTotalVisibility: PropTypes.bool,
  isTicketReadOnly: PropTypes.bool,
  ticketPaymentsVisibility: PropTypes.bool,
  isNewTicket: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  ticketTotalVisibility: makeSelectTicketTotalVisibility(),
  isTicketReadOnly,
  ticketPaymentsVisibility: makeSelectTicketPaymentsVisibility(),
  isNewTicket,
});

export default connect(mapStateToProps)(TicketsPage);
