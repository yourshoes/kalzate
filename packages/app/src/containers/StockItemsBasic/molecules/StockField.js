/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Section10 from '../atoms/Section10';
import Section30 from '../atoms/Section30';
import FloatLabel from '../atoms/FloatLabel';
import StockInput from '../atoms/StockInput';
import StockLabel from '../atoms/StockLabel';

export class StockField extends React.Component {
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
    const Section = this.props.size ? Section30 : Section10;
    return (
      <Section>
        <FloatLabel>
          {!this.props.readonly && (
            <StockInput
              required={this.props.required}
              type="text"
              placeholder={this.props.placeholder}
              onChange={({ target }) =>
                this.setState({ value: target.value }, () => this.props.onChange(target.value))
              }
              value={this.state.value}
              data-cy={this.props['data-cy']}
            />
          )}
          <StockLabel readonly={this.props.readonly}>{this.props.placeholder}</StockLabel>
        </FloatLabel>
      </Section>
    );
  }
}

StockField.propTypes = {
  placeholder: PropTypes.any, // @todo move to string
  onChange: PropTypes.func,
};

export default StockField;
