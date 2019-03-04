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
import TicketItems from 'containers/TicketItems';
import TicketReturnItems from 'containers/TicketReturnItems';
import TicketSoldItems from 'containers/TicketSoldItems';
import TicketTotal from 'containers/TicketTotalContainer';
import TicketPayments from 'containers/TicketPaymentsContainer';
import StockItems from 'containers/StockItems';
import StockItemsBasic from 'containers/StockItemsBasic';
import { Grid, Row2, Column } from 'components/Grid';
import {
  makeSelectTicketTotalVisibility,
  makeSelectTicketPaymentsVisibility,
  makeSelectTicketState,
} from 'containers/TicketsPage/selectors';
import { TICKET_SOLD_STATE, TICKET_RETURN_STATE, DEFAULT_SCHEMA_TYPE } from 'config';

export class TicketsPage extends React.Component {
  componentDidMount() { }

  getItemsComponent() {
    if (this.props.ticketState === TICKET_SOLD_STATE) return <TicketSoldItems />;
    if (this.props.ticketState === TICKET_RETURN_STATE) return <TicketReturnItems />;

    return <TicketItems />;
  }
  getStockItemsComponent() {
    if (DEFAULT_SCHEMA_TYPE === 'SCHEMA_SHOES') return <StockItems />;
    if (DEFAULT_SCHEMA_TYPE === 'SCHEMA_BASIC') return <StockItemsBasic />;

    return <StockItems />;
  }

  render() {
    return (
      <Grid>
        <Helmet
          title="Kalzate Ticket"
          meta={[{ name: 'description', content: 'Ticket' }]}
        />
        <Row2>
          <Column>
            {this.getItemsComponent()}
          </Column>
          <Column w={this.props.ticketTotalVisibility ? '300px' : '25px'}>
            <TicketTotal />
          </Column>
        </Row2>
        <Row2>
          <Column>
            {this.getStockItemsComponent()}
          </Column>
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
  ticketPaymentsVisibility: PropTypes.bool,
  ticketState: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  ticketTotalVisibility: makeSelectTicketTotalVisibility(),
  ticketPaymentsVisibility: makeSelectTicketPaymentsVisibility(),
  ticketState: makeSelectTicketState(),
});

export default connect(mapStateToProps)(TicketsPage);
