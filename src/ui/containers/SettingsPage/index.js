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

  componentWillReceiveProps() {
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
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.countryField })} value={this.props.settings.country} onBlur={(country) => this.props.update('country', country)} />}
                    </Column>
                    <Column>
                      {/* <TextField placeholder={this.props.intl.formatMessage({ ...messages.langField })} value={this.props.intl.formatMessage({ id: `kz.containers.LanguageProvider.${this.props.settings.lang}`, default: '' })} />*/}
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.langField })} value={this.props.settings.lang} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.themeField })} value={this.props.settings.theme} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.timezoneField })} value={this.props.settings.timezone} />}
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
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.nameField })} value={this.props.settings.name} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.addressField })} value={this.props.settings.address} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.emailField })} value={this.props.settings.email} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.phoneField })} value={this.props.settings.phone} />}
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
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.printerNameField })} value={this.props.settings.printerName} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.printerIPField })} value={this.props.settings.printerIP} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <AreaField placeholder={this.props.intl.formatMessage({ ...messages.ticketTemplateField })} value={this.props.settings.ticketTemplate} />}
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
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.backupPeriodField })} value={this.props.settings.backupFrecuency} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.backupLocationField })} value={this.props.settings.backupLocation} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.analyticsServerField })} value={this.props.settings.analyticsServer} />}
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
  settings: PropTypes.object,
  update: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({ settings: selectSettings() });

function mapDispatchToProps(dispatch) {
  return {
    update: (key, value) =>
      dispatch(updateSetting(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettingsPage));
