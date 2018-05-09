/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Section10 from '../atoms/Section10';
import FloatLabel from '../atoms/FloatLabel';
import TicketInput from '../atoms/TicketInput';
import TicketLabel from '../atoms/TicketLabel';

export class TicketTableField extends React.Component {

  render() {
    return (
      <Section10>
        <FloatLabel>
          <TicketInput type="text" placeholder={this.props.placeholder} />
          <TicketLabel>{this.props.placeholder}</TicketLabel>
        </FloatLabel>
      </Section10>
    );
  }
}

TicketTableField.propTypes = {};

export default TicketTableField;
