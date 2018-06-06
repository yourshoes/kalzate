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
import * as Constants from 'ui/constants';
import { Grid, Row2, Column } from 'ui/components/Grid';
import { selectSettings } from './selectors';
import { updateSetting } from './actions';
import messages from './messages';
import { Panel, Title, TextField, AreaField, FormWrapper } from './wrappers';

export class SettingsPage extends React.Component {

  render() {
    console.log(this.props.settings);
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
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.countryField })} value={this.props.settings.country} onBlur={(country) => this.props.update(Constants.COUNTRY_SETTING, country)} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.langField })} value={this.props.settings.lang} onBlur={(lang) => this.props.update(Constants.LANG_SETTING, lang)} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.themeField })} value={this.props.settings.theme} onBlur={(theme) => this.props.update(Constants.THEME_SETTING, theme)} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.timezoneField })} value={this.props.settings.timezone} onBlur={(timezone) => this.props.update(Constants.TIMEZONE_SETTING, timezone)} />}
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
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.nameField })} value={this.props.settings.name} onBlur={(name) => this.props.update(Constants.NAME_SETTING, name)} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.addressField })} value={this.props.settings.address} onBlur={(address) => this.props.update(Constants.ADDRESS_SETTING, address)} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.emailField })} value={this.props.settings.email} onBlur={(email) => this.props.update(Constants.EMAIL_SETTING, email)} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.phoneField })} value={this.props.settings.phone} onBlur={(phone) => this.props.update(Constants.PHONE_SETTING, phone)} />}
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
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.printerNameField })} value={this.props.settings.printerName} onBlur={(printerName) => this.props.update(Constants.PRINTER_NAME_SETTING, printerName)} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.printerIPField })} value={this.props.settings.printerIP} onBlur={(printerIP) => this.props.update(Constants.PRINTER_IP_SETTING, printerIP)} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <AreaField placeholder={this.props.intl.formatMessage({ ...messages.ticketTemplateField })} value={this.props.settings.ticketTemplate} onBlur={(ticketTemplate) => this.props.update(Constants.TICKET_TEMPLATE_SETTING, ticketTemplate)} />}
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
                    {/* Web mode the UI notifies you to remember you about making the backup, i.e. "Hey, last time you made a backup was ..., it is recommended to make a new backup. Click here to back data up", However in desktop mode it makes the backup and then notifies you about the backup as made*/}
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.backupPeriodField })} value={this.props.settings.backupFrecuency} onBlur={(backupFrecuency) => this.props.update(Constants.BACKUP_FRECUENCY_SETTING, backupFrecuency)} />}
                    </Column>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.backupLocationField })} value={this.props.settings.backupLocation} onBlur={(backupLocation) => this.props.update(Constants.BACKUP_LOCATION_SETTING, backupLocation)} />}
                    </Column>
                  </Row2>
                  <Row2>
                    <Column>
                      {this.props.settings && <TextField placeholder={this.props.intl.formatMessage({ ...messages.analyticsServerField })} value={this.props.settings.analyticsServer} onBlur={(analyticsServer) => this.props.update(Constants.ANALYTICS_SERVER_SETTING, analyticsServer)} />}
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
