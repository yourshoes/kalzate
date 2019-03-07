/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Section5 from '../atoms/Section5';
import TicketButton from '../atoms/TicketButton';

export class TicketTableButton extends React.Component {

  render() {
    return (
      <Section5>
        <TicketButton {...this.props} />
      </Section5>
    );
  }
}

TicketTableButton.propTypes = {};

export default TicketTableButton;
