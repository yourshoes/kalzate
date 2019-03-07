/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Section10 from '../atoms/Section10';
import FloatLabel from '../atoms/FloatLabel';
import TicketInputFixed from '../atoms/TicketInputFixed';
import TicketLabel from '../atoms/TicketLabel';

export class TicketTableField extends React.Component {
  static defaultProps = {
    onChange: () => null,
    onBlur: () => null,
  };

  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
  }
  // @todo replace componentWillReceiveProps by getDerivedStateFromProps
  // from React 17
  componentWillReceiveProps(props) {
    console.log(props.value);
    this.setState({ value: props.value });
  }

  render() {
    const placeholderHasValue = Boolean(this.props.placeholder);
    return (
      <Section10 bigger={this.props.bigger} onBlur={(e) => this.props.onBlur(e)}>
        <FloatLabel>
          {placeholderHasValue && (
            <TicketInputFixed
              type="text"
              onChange={({ target }) =>
                this.setState({ value: target.value }, () => this.props.onChange(target.value))
              }
              value={this.state.value}
            />
          )}
          <TicketLabel readonly={!placeholderHasValue}>
            {placeholderHasValue ? this.props.placeholder : this.state.value}
          </TicketLabel>
        </FloatLabel>
      </Section10>
    );
  }
}

TicketTableField.propTypes = {};

export default TicketTableField;
