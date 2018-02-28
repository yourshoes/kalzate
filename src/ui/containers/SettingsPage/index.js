/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Grid, Row2, Column } from 'ui/components/Grid';
import { selectSettings } from './selectors';
import { updateSetting } from './actions';
import messages from './messages';
import { Panel, Title, TextField, AreaField, FormWrapper } from './wrappers';

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
              <Title><FormattedMessage {...messages.userSettings} /></Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.countryField })} />
                    </Column>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.langField })} />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.themeField })} />
                    </Column>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.timezoneField })} />
                    </Column>
                  </Row2>
                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
          <Column>
            <Panel>
              <Title><FormattedMessage {...messages.companySettings} /></Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.nameField })} />
                    </Column>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.addressField })} />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.emailField })} />
                    </Column>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.phoneField })} />
                    </Column>
                  </Row2>
                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
        </Row2>
        <Row2>
          <Column>
            <Panel><Title><FormattedMessage {...messages.ticketSettings} /></Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.printerNameField })} />
                    </Column>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.printerIPField })} />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <AreaField placeholder={this.props.intl.formatMessage({ ...messages.ticketTemplateField })} />
                    </Column>
                  </Row2>
                </Grid>
              </FormWrapper>
            </Panel>
          </Column>
          <Column>
            <Panel><Title><FormattedMessage {...messages.storageSettings} /></Title>
              <FormWrapper>
                <Grid>
                  <Row2>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.backupPeriodField })} />
                    </Column>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.backupLocationField })} />
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      <TextField placeholder={this.props.intl.formatMessage({ ...messages.analyticsServerField })} />
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
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settings: selectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    update: (key, value) =>
      dispatch(updateSetting(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettingsPage));
