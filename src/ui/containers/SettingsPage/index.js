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
              <Title>User Settings</Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <StockField placeholder="Country" />
                    </Column>
                    <Column>
                      <StockField placeholder="Language" />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <StockField placeholder="Theme" />
                    </Column>
                    <Column>
                      <StockField placeholder="Timezone" />
                    </Column>
                  </Row2>
                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
          <Column>
            <Panel>
              <Title>Company Settings</Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <StockField placeholder="Name" />
                    </Column>
                    <Column>
                      <StockField placeholder="Address" />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <StockField placeholder="Email" />
                    </Column>
                    <Column>
                      <StockField placeholder="Phone" />
                    </Column>
                  </Row2>
                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
        </Row2>
        <Row2>
          <Column>
            <Panel><Title>Ticket Settings</Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <StockField placeholder="Printer Name" />
                    </Column>
                    <Column>
                      <StockField placeholder="Printer IP" />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <StockArea placeholder="Ticket Template" />
                    </Column>
                  </Row2>
                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
          <Column>
            <Panel><Title>Storage Settings</Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <StockField placeholder="Backup Time" />
                    </Column>
                    <Column>
                      <StockField placeholder="Backup Folder" />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <StockField placeholder="Database IP" />
                    </Column>
                  </Row2>
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
