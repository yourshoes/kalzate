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

export class InteractiveStockField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
  }
  // @todo replace componentWillReceiveProps by getDerivedStateFromProps
  // from React 17
  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  stopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
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
                this.setState({ value: target.value }, () => this.props.onChange(target.value))
              }
              onKeyDown={(event) => {
                const { target, key } = event;
                switch (key) {
                  case 'Enter':
                    this.props.onEnter && this.props.onEnter(target.value);
                    return this.stopPropagation(event);
                  case 'ArrowUp':
                    this.props.onMoveUp && this.props.onMoveUp(target.value);
                    return this.stopPropagation(event);
                  case 'ArrowDown':
                    this.props.onMoveDown && this.props.onMoveDown(target.value);
                    return this.stopPropagation(event);
                  case 'Escape':
                    this.props.onEscape && this.props.onEscape(target.value);
                    return this.stopPropagation(event);
                  default:
                }
                return true;
              }}
              value={this.state.value}
            />
          )}
          <StockLabel readonly={this.props.readonly}>{this.props.placeholder}</StockLabel>
        </FloatLabel>
      </Section10>
    );
  }
}

InteractiveStockField.propTypes = {
  placeholder: PropTypes.any, // @todo move to string
  onChange: PropTypes.func,
};

export default InteractiveStockField;
