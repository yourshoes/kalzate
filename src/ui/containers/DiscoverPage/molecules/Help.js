/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import HelpContainer from '../atoms/HelpContainer';
import HelpTooltip from '../atoms/HelpTooltip';

export class Help extends React.Component {

  render() {
    return (
      <HelpContainer>
        <Octicon name={'info'} />
        <HelpTooltip>{this.props.children}</HelpTooltip>
      </HelpContainer>
    );
  }
}

Help.propTypes = {};

export default Help;
