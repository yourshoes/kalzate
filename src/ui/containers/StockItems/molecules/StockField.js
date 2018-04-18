/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Section10 from '../atoms/Section10';
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
    return (
      <Section10>
        <FloatLabel>
          {!this.props.readonly && (
            <StockInput
              type="text"
              placeholder={this.props.placeholder}
              onChange={({ target }) =>
                this.setState({ value: target.value }, () =>
                  this.props.onChange(target.value)
                )
              }
              value={this.state.value}
            />
          )}
          <StockLabel readonly={this.props.readonly}>
            {this.props.placeholder}
          </StockLabel>
        </FloatLabel>
      </Section10>
    );
  }
}

StockField.propTypes = {
  placeholder: PropTypes.any, // @todo move to string
  onChange: PropTypes.func,
};

export default StockField;
