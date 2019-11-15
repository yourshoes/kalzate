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
    const {
      readonly,
      required,
      placeholder,
      onEnter,
      onMoveUp,
      onMoveDown,
      onEscape,
      onChange,
      ...other
    } = this.props;

    return (
      <Section10>
        <FloatLabel>
          {!readonly && (
            <StockInput
              required={required}
              type="text"
              placeholder={placeholder}
              onChange={({ target }) =>
                this.setState({ value: target.value }, () => onChange(target.value))
              }
              onKeyDown={(event) => {
                const { target, key } = event;
                switch (key) {
                  case 'Enter':
                    onEnter && onEnter(target.value);
                    return this.stopPropagation(event);
                  case 'ArrowUp':
                    onMoveUp && onMoveUp(target.value);
                    return this.stopPropagation(event);
                  case 'ArrowDown':
                    onMoveDown && onMoveDown(target.value);
                    return this.stopPropagation(event);
                  case 'Escape':
                    onEscape && onEscape(target.value);
                    return this.stopPropagation(event);
                  default:
                }
                return true;
              }}
              value={this.state.value}
              {...other}
            />
          )}
          <StockLabel readonly={readonly}>{placeholder}</StockLabel>
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
