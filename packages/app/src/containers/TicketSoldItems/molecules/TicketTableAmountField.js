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

  static defaultProps = {
    onChange: () => null,
    onBlur: () => null,
  }

  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
  }
  // @todo replace componentWillReceiveProps by getDerivedStateFromProps
  // from React 17
  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  render() {
    return (
      <Section10 bigger={this.props.bigger} onBlur={(e) => this.props.onBlur(e)}>
        <FloatLabel>
          {!this.props.readonly && <TicketInput
            type="text"
            placeholder={this.props.placeholder}
            onChange={({ target }) =>
              this.setState({ value: target.value }, () =>
                this.props.onChange(target.value)
              )
            }
            value={this.state.value}
          />}
          <TicketLabel readonly={this.props.readonly}>{this.props.placeholder}</TicketLabel>
        </FloatLabel>
      </Section10>
    );
  }
}

TicketTableField.propTypes = {};

export default TicketTableField;
