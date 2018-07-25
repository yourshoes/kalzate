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
import { isEmpty } from 'lodash';
import { Grid, Row2, Column } from 'ui/components/Grid';
// import messages from './messages';
import BarChart from 'ui/charts/catalog/barchart/svg';
import ScatterPlot from 'ui/charts/catalog/scatterplot/svg';
import BoxPlot from 'ui/charts/catalog/boxplot/svg';
import { Panel, Title } from './wrappers';
import Tooltip from './atoms/Tooltip';
import Table from './molecules/Table';
import Help from './molecules/Help';
import {
  makeSelectSalesChart,
  makeSelectTicketsChart,
  makeSelectStockChart,
  makeSelectAlertChart,
} from './selectors';
import {
  loadChartsData,
} from './actions';

export class DiscoverPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      salesTooltipText: '',
      ticketsTooltipText: '',
      stockTooltipText: '',
      ...this.getDimensions(),
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    // @todo move to db.js at init state
    this.props.loadChartsData();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  getDimensions() {
    return { width: ((window.innerWidth - 260) / 2) - 60, height: ((window.innerHeight - 32) / 2) - 90 - 30 };
  }

  updateDimensions() {
    this.setState(this.getDimensions());
  }

  render() {
    return (
      <Grid>
        <Helmet
          title="Kalzate Settings"
          meta={[{ name: 'description', content: 'Settings' }]}
        />
        <Row2>
          <Column>
            <Panel>
              <Title><Help>The sales chart renders the total incoming made (y axis) per day (x axis)</Help>    Sales Chart <Tooltip>{this.state.salesTooltipText}</Tooltip></Title>
              {/* <p>total sold per day/week/month</p>*/}
              {!isEmpty(this.props.salesChart) &&
                <BarChart
                  width={this.state.width}
                  height={this.state.height}
                  data={this.props.salesChart}
                  onMouseOver={({ amount, day }) => this.setState({ salesTooltipText: `${amount} (${day})` })}
                  onMouseOut={() => this.setState({ salesTooltipText: '' })}
                />}
            </Panel>
          </Column>
          <Column>
            <Panel>
              <Title><Help>The tickets chart renders ticket aggregaation values including the maximum, minimum, third quartile, median and first quartile (y axis) per day (x axis)</Help> Tickets Chart <Tooltip>{this.state.ticketsTooltipText}</Tooltip></Title>
              {/* <p>Number of tickets made per day/week/month</p>*/}
              {!isEmpty(this.props.ticketsChart) &&
                <BoxPlot
                  width={this.state.width}
                  height={this.state.height}
                  data={this.props.ticketsChart}
                  onMouseOver={({ maximum, minimum, median, quartile1, quartile3, day }) => this.setState({ ticketsTooltipText: `${maximum}-${minimum}, ${quartile3}-${median}-${quartile1} (${day})` })}
                  onMouseOut={() => this.setState({ ticketsTooltipText: '' })}
                />}
            </Panel>
          </Column>
        </Row2>
        <Row2>
          <Column>
            <Panel>
              <Title><Help>The stock chart renders the relationship between the price (y axis) and the number of items sold (x axis). The radius is the amount of items available</Help> Stock Chart <Tooltip>{this.state.stockTooltipText}</Tooltip></Title>
              {/* <p>Top 10 Stock items more sold</p>*/}
              {!isEmpty(this.props.stockChart) &&
                <ScatterPlot
                  width={this.state.width}
                  height={this.state.height}
                  data={this.props.stockChart}
                  onMouseOver={({ amount, price, sold }) => this.setState({ stockTooltipText: `${sold}-${price} (${amount})` })}
                  onMouseOut={() => this.setState({ stockTooltipText: '' })}
                />}
            </Panel>
          </Column>
          <Column>
            <Panel>
              <Title><Help>The alert chart renders the top stock items more sold, the top stock items less sold and the items with no available stock</Help> Alert Stock Chart</Title>
              {/* <p>Stock items with only one unit left</p>*/}
              {!isEmpty(this.props.alertChart) && <Table data={this.props.alertChart} />}
            </Panel>
          </Column>
        </Row2>
      </Grid>
    );
  }
}

DiscoverPage.propTypes = {
  resources: React.PropTypes.object,
  resourceSelected: React.PropTypes.string,
  changeResourceSelected: React.PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  salesChart: makeSelectSalesChart(),
  ticketsChart: makeSelectTicketsChart(),
  stockChart: makeSelectStockChart(),
  alertChart: makeSelectAlertChart(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadChartsData: (charts) => dispatch(loadChartsData({ charts })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);

