/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { platformKeySymbols } from 'utils/helper';
import Logo from 'components/Logo';
import Ribbon from 'components/Ribbon';
import messages from './messages';
import {
  Container,
  MessageContainer,
  MessageCentered,
  MessageList,
  MessageListItem,
  KeyStroke,
  LogoTitle,
  Help,
} from './wrappers';

export default class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <Helmet
          title="Kalzate"
          meta={[
            {
              name: 'description',
              content: 'Kalzate, Serverless Point Of Sale App For Humans',
            },
          ]}
        />
        <MessageContainer style={{ display: 'none' }}>
          <MessageCentered>
            <Logo />
            <MessageList>
              <MessageListItem>
                <LogoTitle>
                  <FormattedMessage {...messages.header} />
                </LogoTitle>
              </MessageListItem>
              {
                <MessageListItem>
                  <FormattedMessage {...messages.subheader} />
                </MessageListItem>
              }
              <MessageListItem>
                <Help>
                  <FormattedMessage {...messages.help} />
                  <KeyStroke>{platformKeySymbols(0)}C</KeyStroke>
                </Help>
              </MessageListItem>
            </MessageList>
          </MessageCentered>
        </MessageContainer>
        <Ribbon />
      </Container>
    );
  }
}
