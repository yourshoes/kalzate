/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { Grid, Row2, Column } from 'ui/components/Grid';
import Center from 'ui/components/Center';
import NotFound from 'ui/components/NotFound';
import messages from './messages';
import BarChart from 'ui/charts/catalog/barchart/svg';
import ScatterPlot from 'ui/charts/catalog/scatterplot/svg';
import BoxPlot from 'ui/charts/catalog/boxplot/svg';
import { Panel, Title } from './wrappers';
import NoDataTitle from './atoms/Title';
import Subtitle from './atoms/Subtitle';
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
    window.addEventListener('resize', this.updateDimensions);
    this.props.loadChartsData();
  }

  componentDidUpdate() {
    // @todo move to db.js at init state
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
              <Title><Help><FormattedMessage {...messages.salesDesc} /></Help> <FormattedMessage {...messages.salesTitle} /> <Tooltip>{this.state.salesTooltipText}</Tooltip></Title>
              {/* <p>total sold per day/week/month</p>*/}
              {!isEmpty(this.props.salesChart) ?
                <BarChart
                  width={this.state.width}
                  height={this.state.height}
                  data={this.props.salesChart}
                  onMouseOver={({ amount, day }) => this.setState({ salesTooltipText: `${amount.toFixed(2)} (${day})` })}
                  onMouseOut={() => this.setState({ salesTooltipText: '' })}
                /> : <Center>
                  <NotFound icon="thumbsdown">
                    <NoDataTitle>
                    <FormattedMessage {...messages.salesNoData} />
              </NoDataTitle>
                    <Subtitle>
                    <FormattedMessage {...messages.salesNoDataDesc} />
                </Subtitle>
                  </NotFound>
                </Center>}
            </Panel>
          </Column>
          <Column>
            <Panel>
              <Title><Help><FormattedMessage {...messages.ticketsDesc} /></Help> <FormattedMessage {...messages.ticketsTitle} /> <Tooltip>{this.state.ticketsTooltipText}</Tooltip></Title>
              {/* <p>Number of tickets made per day/week/month</p>*/}
              {!isEmpty(this.props.ticketsChart) ?
                <BoxPlot
                  width={this.state.width}
                  height={this.state.height}
                  data={this.props.ticketsChart}
                  onMouseOver={({ maximum, minimum, median, quartile1, quartile3, day }) => this.setState({ ticketsTooltipText: `${maximum}-${minimum}, ${quartile3}-${median}-${quartile1} (${day})` })}
                  onMouseOut={() => this.setState({ ticketsTooltipText: '' })}
                /> : <Center>
                  <NotFound icon="thumbsdown">
                    <NoDataTitle>
                    <FormattedMessage {...messages.ticketsNoData} />
                </NoDataTitle>
                    <Subtitle>
                    <FormattedMessage {...messages.ticketsNoDataDesc} />
                  </Subtitle>
                  </NotFound>
                </Center>}
            </Panel>
          </Column>
        </Row2>
        <Row2>
          <Column>
            <Panel>
              <Title><Help><FormattedMessage {...messages.stockDesc} /></Help> <FormattedMessage {...messages.stockTitle} /> <Tooltip>{this.state.stockTooltipText}</Tooltip></Title>
              {/* <p>Top 10 Stock items more sold</p>*/}
              {!isEmpty(this.props.stockChart) ?
                <ScatterPlot
                  width={this.state.width}
                  height={this.state.height}
                  data={this.props.stockChart}
                  onMouseOver={({ amount, price, sold, title }) => this.setState({ stockTooltipText: `${sold}-${price} (${title} - ${amount})` })}
                  onMouseOut={() => this.setState({ stockTooltipText: '' })}
                /> : <Center>
                  <NotFound icon="thumbsdown">
                    <NoDataTitle>
                    <FormattedMessage {...messages.stockNoData} />
                </NoDataTitle>
                    <Subtitle>
                    <FormattedMessage {...messages.stockNoDataDesc} />
                  </Subtitle>
                  </NotFound>
                </Center>}
            </Panel>
          </Column>
          <Column>
            <Panel>
              <Title><Help><FormattedMessage {...messages.alertDesc} /></Help> <FormattedMessage {...messages.alertTitle} /> </Title>
              {/* <p>Stock items with only one unit left</p>*/}
              {!isEmpty(this.props.alertChart) ? <Table data={this.props.alertChart} headerMessages={[<FormattedMessage {...messages.alertTopSold} />,<FormattedMessage {...messages.alertTopLessSold} />,<FormattedMessage {...messages.alertEmptyStock} />]}/> : <Center>
                <NotFound icon="thumbsdown">
                  <NoDataTitle>
                  <FormattedMessage {...messages.alertNoData} />
                </NoDataTitle>
                  <Subtitle>
                  <FormattedMessage {...messages.alertNoDataDesc} />
                  </Subtitle>
                </NotFound>
              </Center>}
              {/* <FormattedMessage {...messages.notFoundHelp} />*/}
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

