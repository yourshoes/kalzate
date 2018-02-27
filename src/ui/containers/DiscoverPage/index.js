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
import { getNotebookContent } from 'ui/utils/resources';
import { Grid, Row2, Column } from 'ui/components/Grid';
import { changeResourceSelected } from 'ui/containers/SidebarMenu/actions';
import { selectResources, selectResource } from './selectors';
import messages from './messages';
import { Panel, Title, StockField, StockArea, FormWrapper } from './wrappers';

export class SettingsPage extends React.Component {
  componentDidMount() {

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
              <Title>Sales Chart</Title>
              <p>total sold per day/week/month</p>
              <FormWrapper>
                <Grid>

                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
          <Column>
            <Panel>
              <Title>Tickets Chart</Title>
              <p>Number of tickets made per day/week/month</p>
              <FormWrapper>
                <Grid>

                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
        </Row2>
        <Row2>
          <Column>
            <Panel>
              <Title>Top Stock Chart</Title>
              <p>Top 10 Stock items more sold</p>
              <FormWrapper>
                <Grid>

                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
          <Column>
            <Panel><Title>Alert Stock Chart</Title>
              <p>Stock items with only one unit left</p>
              <FormWrapper>
                <Grid>

                </Grid>
              </FormWrapper></Panel>
          </Column>
        </Row2>
      </Grid>
    );
  }
}

SettingsPage.propTypes = {
  resources: React.PropTypes.object,
  resourceSelected: React.PropTypes.string,
  changeResourceSelected: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  resources: selectResources(),
  resourceSelected: selectResource(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeResourceSelected: (resource) =>
      dispatch(changeResourceSelected(resource)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
