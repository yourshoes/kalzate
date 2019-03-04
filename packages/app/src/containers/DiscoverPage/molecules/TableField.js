/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Section4 from '../atoms/Section4';
import FloatLabel from '../atoms/FloatLabel';
import Label from '../atoms/Label';

export class TableField extends React.Component {

  render() {
    return (
      <Section4 bigger={this.props.bigger}>
        <FloatLabel>
          <Label readonly={this.props.readonly}>{this.props.placeholder}</Label>
        </FloatLabel>
      </Section4>
    );
  }
}

TableField.propTypes = {};

export default TableField;
