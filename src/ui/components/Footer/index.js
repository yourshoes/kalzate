import React from 'react';

import { FormattedMessage } from 'react-intl';
import Octicon from 'react-octicon';
import LocaleToggle from 'ui/containers/LocaleToggle';
import ThemeToggle from 'ui/containers/ThemeToggle';
import A from 'ui/components/A';
import {
  Container,
  StatusBar,
  StatusBarLeft,
  StatusBarRight,
  StatusBarItem,
} from './wrappers';
import messages from './messages';

export default function Footer() {
  return (
    <Container>
      <StatusBar>
        <StatusBarLeft>
          <StatusBarItem>
            <A to="/" style={{ primary: true }}>
              <Octicon name="home" />
              <FormattedMessage {...messages.home} />
            </A>
          </StatusBarItem>
          <StatusBarItem>
            <A
              target="_blank"
              href="https://github.com/yourshoes/kalzate/issues"
            >
              <Octicon name="flame" />
              <FormattedMessage {...messages.bugs} />
            </A>
          </StatusBarItem>
          <StatusBarItem>
            <A
              target="_blank"
              href="https://github.com/yourshoes/kalzate/blob/unstable/LICENSE.md"
            >
              <Octicon name="law" />
              <FormattedMessage {...messages.license} />
            </A>
          </StatusBarItem>
        </StatusBarLeft>
        <StatusBarRight>
          <LocaleToggle>
            <StatusBarItem>
              <A>
                <Octicon name="globe" />
                <FormattedMessage {...messages.languages} />
              </A>
            </StatusBarItem>
          </LocaleToggle>
          <ThemeToggle>
            <StatusBarItem>
              <A>
                <Octicon name="paintcan" />
                <FormattedMessage {...messages.themes} />
              </A>
            </StatusBarItem>
          </ThemeToggle>
          <StatusBarItem>
            <A style={{ secondary: true }}>
              <Octicon name="sync" />
              <FormattedMessage {...messages.help} />
            </A>
          </StatusBarItem>
        </StatusBarRight>
      </StatusBar>
    </Container>
  );
}
